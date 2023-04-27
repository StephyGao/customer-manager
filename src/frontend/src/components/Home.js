import { useState, useEffect } from 'react';
import { deleteCustomer, getAllCustomers, updateCustomer } from '../client';
import { 
  theme,
  Breadcrumb, 
  Layout, 
  Menu, 
  Table, Spin, Empty, Button, Form, Switch, Popconfirm, Typography, Input, Badge, Tag,
} from 'antd';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LoadingOutlined,
  PlusOutlined
} from '@ant-design/icons';

import CustomerDrawerForm from "./CustomerDrawerForm";
import Avatar from 'antd/es/avatar/avatar';

import './Home.css';
import { errorNotification, successNotification } from './Notification';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function Home() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [customers, setCustomers] = useState([]); //the customers will contain the data coming from the backend (8080), initial state is [](ide tells you this is what he needs in order to parse),in this case it parses anyway
  const [collapsed, setCollapsed] = useState(false); //default false, set state when we change the state only
  const [fetching, setFetching] = useState(true);
  const [expandable, setExpandable] = useState(undefined);
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  //fetching customers
  const fetchCustomers = () => 
  getAllCustomers() //calling client's function to load that page with Home.js file
    .then(res => res.json())
    .then(data => {
      console.log("data: ");
      console.log(data);
      setCustomers(data);
      setFetching(false);
      }).catch(err => {
        console.log(err.response)
        err.response.json().then(res => {
          console.log(res);
          errorNotification(
            "There was an issue",
            `${res.message} [statusCode:${res.status}]`
            );
        });
      });
  // const defaultExpandable = {
  //   expandedRowRender: (record) => <p>{record.notes}</p>,
  // };
  // const handleExpandChange = (enable) => {
  //   setExpandable(enable ? defaultExpandable : undefined);
  // };
  const tableProps = {
    expandable,
  };
  //edit customer
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  const isEditing = (record) => record.id === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      email: '',
      gender: '',
      status: '',
      notes: '',
      ...record,
    });
    setEditingKey(record.id);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async (record) => {
    try {
      const row = await form.validateFields();
      const newData = [...customers];
      const index = newData.findIndex((item) => record.id === item.id);
      console.log("editing index: ", index);
      if (index > -1) {
        const item = newData[index];
        newData[index] = {
          ...item,
          ...row,
          notes: row.notes || item.notes
        };
        console.log(newData[index]);
        updateCustomer(record.id, newData[index])
          .then(() => {
            successNotification(
              "customer successfully modified",
              `Customer with ID:${record.id} was modified`
                    );
                fetchCustomers(); //when close the drawer, re-load the page automatically(load new table with added customer from server)
            }).catch(err => {
                console.log(err)
            })
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const TheAvatar = ({ firstname, lastname }) => {
    if(firstname === null)
      return <Avatar icon={<UserOutlined/>}/>
    if(lastname === null)
      return <Avatar>{firstname.charAt(0)}</Avatar>
    return <Avatar> {firstname.charAt(0).toUpperCase()}{lastname.charAt(0).toUpperCase()}</Avatar>
  }

  const handleRowSelectionChange = async (selectedRowKeys) => {
    await setSelectedRowKeys(selectedRowKeys);
  }

  const handleDeleteSelectedRows = () => {
    if(selectedRowKeys.length > 0) {
      deleteCustomer(selectedRowKeys)
        .then(() => {
          console.log("ids deleted: ", selectedRowKeys);
          fetchCustomers();
          setSelectedRowKeys([]);
        })
        .catch(err => {
            console.log(err);
        });
    }
  };
  const columns = [
    {
      title: '',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 50,
      render: (text, customer) => <TheAvatar firstname = {customer.firstname} lastname = {customer.lastname}/>,
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 50,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      editable: true,
      width: 160,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      editable: true,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      editable: true,
      width: 84,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      editable: true,
      width: 100,
    },
    {
      title: 'Additional Info',
      dataIndex: 'notes',
      key: 'notes',
      editable: true,
      width: 160,
    },
    {
      title: '',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return (
          <span> 
            {editable ? (
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography.Link
                    style = {{ padding: '4px 8px' }}
                    onClick={() => save(record)}
                  >
                    Save
                  </Typography.Link>
                  <Popconfirm 
                    title="confirm cancel?"
                    cancelText="No" 
                    onConfirm={cancel}
                  >
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
              ) : (
                <Typography.Link 
                  disabled={editingKey !== ''} 
                  onClick={() => edit(record)}
                >
                  Edit
                </Typography.Link>
              )
            }
          </span>
        );
      },
      width: 130,
    },
  ];
  //continuing editable
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  useEffect(() => {
    console.log("component is mounted!")
    fetchCustomers();
  }, []); //[] means 0 dependencies, it is added to make the useEffect only be called once when the component mounts. or useEffect will run everytime the dependency is used if dependency added.
  //exandable
  const renderCustomers = () => {
    if(fetching) {
      return <Spin indicator={antIcon} />
    }

    if(customers.length <= 0) {
      return <>
                <Button
                    onClick={() => setShowDrawer(!showDrawer)}
                    type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                    Add New Customer
                </Button>
                <CustomerDrawerForm
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                    fetchStudents={fetchCustomers}
                />
                <Empty/>
             </>
    }
    return (
      <>
      <Form
        //for editable
        form={form} component={false}
        //for expandable
        layout="inline"
        className="components-table-demo-control-bar"
        style={{
          marginBottom: 16,
        }}
      >
        <CustomerDrawerForm //add new customer page
          showDrawer={showDrawer}
          setShowDrawer={setShowDrawer}
          fetchCustomers={fetchCustomers}
        />
        <Table 
          dataSource={customers}

          {...tableProps} //for expand notes column

          title={() => //title total customer count
            <>
              <Tag>Total Customer Count</Tag>
              <Badge count={customers.length} className="site-badge-count-4"/>
            </>
          }

          // expandable={{ //for notes below user into
          //   expandedRowRender: (record) => (
          //     <p> {record.notes} </p>
          //   ),
          //   rowExpandable: (record) => record.name !== 'Not Expandable',
          // }}

          components={{ //editable 
            body: {
              cell: EditableCell,
            },
          }}
          columns={mergedColumns}
          rowClassName="editable-row"

          rowKey = {(customers) => customers.id}
          rowSelection={{selectedRowKeys, onChange: handleRowSelectionChange}}
          footer={() => ( 
              <> 
                <Button //add customer
                  onClick={() => setShowDrawer(!showDrawer)} 
                  type="primary" shape="round" icon={<PlusOutlined />} size="small">
                    Add New Customer
                </Button>
                <Popconfirm //delete customers
                  title="Delete the task"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={handleDeleteSelectedRows}
                  >
                  <Button type="link">Delete</Button>
                </Popconfirm>
              </>
              )
            }

          pagination={{ pageSize: 50, onChange: cancel, }}
          bordered
          scroll={{ x: 'max-content', y: 400 }}
        />
      </Form>
    </>
    );
  }
    return <Layout className='main'>
      <Sider collapsible collapsed={collapsed} //这里的setCollapsed 等于setCollapsed(c) => setCollapsed(c)
             onCollapse={setCollapsed}>
        <div className='logo'/>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header style = {{background: colorBgContainer}}/>
        <Content className="user-site">
          <Breadcrumb className="user-site-username">
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className = "user-site-background" style ={{background: colorBgContainer}}>
          {/* render customers called here */}
            {renderCustomers()}
          </div>
        </Content>
        <Footer>
          By StephyGao ©2022 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
}

export default Home;