import {Drawer, Input, Col, Select, Form, Row, Button, Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { addNewCustomer } from '../client.js';
import { useState } from 'react';
import { successNotification, errorNotification } from './Notification.js';
const {Option} = Select;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function CustomerDrawerForm({showDrawer, setShowDrawer, fetchCustomers}) {
    const onCLose = () => setShowDrawer(false);
    const [ submitting, setSubmitting ] = useState(false);
    //formed new input info(customer) will be used to display on table here
    const onFinish = customer => {
        setSubmitting(true)
        console.log(JSON.stringify(customer, null, 2));
        addNewCustomer(customer) //calling add customer to add to server(sent a post request to server finally info will sent to db)
            .then(() => {
                onCLose();
                successNotification(
                    "customer successfully added",
                    `${customer.name} was added to the system`
                    );
                console.log("customer: ", customer);
                fetchCustomers(); //when close the drawer, re-load the page automatically(load new table with added customer from server)
            })
            .catch(err => {
                console.log("errror: ", err)
                err.response.json().then(res =>{
                    console.log(res);
                    errorNotification(
                        "There was an issue",
                        `${res.message}[${res.status}]`,
                        "bottomLeft"
                    )
                })
            })
            // .then(() => {
            //     onCLose();
            //     successNotification(
            //         "customer successfully added",
            //         `${customer.name} was added to the system`
            //         );
            //     console.log("customer: ", customer);
            //     fetchCustomers(); //when close the drawer, re-load the page automatically(load new table with added customer from server)
            // })
            .finally(() => {
                setSubmitting(false);
            });
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    return <Drawer
        title="Create new customer"
        width={720}
        onClose={onCLose}
        open={showDrawer}
        bodyStyle={{paddingBottom: 80}}
        footer={
            <div
                style={{
                    textAlign: 'right',
                }}
            >
                <Button onClick={onCLose} style={{marginRight: 8}}>
                    Cancel
                </Button>
            </div>
        }
    >
        <Form layout="vertical" //new customer info will be saved into form with onFinish command from the browser
              onFinishFailed={onFinishFailed}
              onFinish={onFinish}
              requiredMark>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{required: true, message: 'Please enter customer name'}]}
                    >
                        <Input placeholder="Please enter customer name"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{required: true, message: 'Please enter customer email'}]}
                    >
                        <Input placeholder="Please enter customer email"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[{required: true, message: 'Please select a gender'}]}
                    >
                        <Select placeholder="Please select a gender">
                            <Option value="MALE">MALE</Option>
                            <Option value="FEMALE">FEMALE</Option>
                            <Option value="OTHER">OTHER</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[{required: true, message: 'Please enter customer status'}]}
                    >
                        <Input placeholder="Please enter customer status"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="notes"
                        label="Additional Information"
                    >
                        <Input placeholder="Please enter customer additional information"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                { submitting && <Spin indicato={antIcon}/> }
            </Row>
        </Form>
    </Drawer>
}

export default CustomerDrawerForm;