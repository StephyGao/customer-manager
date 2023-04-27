import fetch from 'unfetch';

const checkStatus = response => {
        if (response.ok) { //we will get status code 200
          return response;
        } else {
          var error = new Error(response.statusText);
          error.response = response;
          return Promise.reject(error); 
        }
}
export const getAllCustomers = async () => {
    const response = await fetch("api/v1/customers") //client fetch server 的 response，server在8080 port口
    ;
  return checkStatus(response);
}

export const addNewCustomer = customer => {
    return fetch("api/v1/customers", {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(customer)
      })
}
export const deleteCustomer = ids => {
    return fetch("api/v1/customers/ids", {
        headers: {
          'Content-Type':'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify(ids)
    })
}
export const updateCustomer = (id, updatedCustomer) => {
    return fetch(`api/v1/customers/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(updatedCustomer)
    })
}
// export const login = () => {
//     fetch("auth_login"); //client fetch server 的 response，server在8080 port口
// }
// export const logout = () => {
//     fetch("auth_logout"); //client fetch server 的 response，server在8080 port口
// }