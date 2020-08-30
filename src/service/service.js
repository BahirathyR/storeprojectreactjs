import http from './http'
const api = '/api';
// ownerLogin
export const addAdmin = (data) => {
    return http.post(`${api}/addAdmin`, data)
}

export const ownerLogin= (data) => {                     
    return http.post(`${api}/ownerLogin`, data)
}

export const supplierLogin= (data) => {                     
    return http.post(`${api}/supplierLogin`, data)
}

export const employeeLogin= (data) => {                     
    return http.post(`${api}/employeeLogin`, data)
}


export const addStore= (data) => {                     
    return http.post(`${api}/addStore`, data)
}
export const addSupplier= (data) => {                     
    return http.post(`${api}/addSupplier`, data)
}
export const addCustomer= (data) => {                     
    return http.post(`${api}/addCustomer`, data)
}

export const addEmployee= (data) => {                     
    return http.post(`${api}/addEmployee`, data)
}


export const getCustomer = () =>{                                            
    return http.get(`${api}/getCustomer`)
}

export const getStore = () =>{                                            
    return http.get(`${api}/getStore`)
}
export const getSupplier = () =>{                                            
    return http.get(`${api}/getSupplier`)
}
export const getEmployee = () =>{                                            
    return http.get(`${api}/getEmployee`)
}

export const deleteEmployeeById= (data) => {
    return http.delete(`${api}/deleteEmployeeById/${data._id}`)
}


export const deleteCustomerById = (data) => {
    return http.delete(`${api}/deleteCustomerById/${data._id}`)
}

export const deleteStoreById = (data) => {
    return http.delete(`${api}/deleteStoreById/${data._id}`)
}

export const deleteSupplierById = (data) => {
    return http.delete(`${api}/deleteSupplierById/${data._id}`)
}



export const updateCustomerById = (data) => {
    console.log("datassssss",data)
        return http.post(`${api}/updateCustomerById`,data)
}
export const updateStoreById = (data) => {
    console.log("datassssss",data)
        return http.post(`${api}/updateStoreById`,data)
}
export const updateSupplierById = (data) => {
    console.log("datassssss",data)
        return http.post(`${api}/updateSupplierById`,data)
}

export const updateEmployeeById = (data) => {
    console.log("datassssss",data)
        return http.post(`${api}/updateEmployeeById`,data)
}


export const getbyIDCustomer  = (data) =>{
    return http.get(`${api}/getbyIDCustomer /${data._id} `)
}


// get method without data      
export const getAdmin = () =>{                                            
    return http.get(`${api}/getAdmin`)
}

// get method with data             
export const getAdminByMail = (data) =>{
    return http.get(`${api}/getAdminByMail`, data)
}

export const updateAdminByMail = (data) => {
    return http.put(`${api}/updateAdminByMail/${data.oldMailid}/${data.newMailId}`)
}

export const deletAdminById = (data) => {
    return http.delete(`${api}/deletAdminById/${data._id}`)
}

export default {
    addAdmin,
    getAdmin,
    getAdminByMail,
    updateAdminByMail,
    deletAdminById,
    ownerLogin,
    addStore,
    addSupplier,
    addCustomer,
    addEmployee,
    getCustomer,
    deleteCustomerById,
    updateCustomerById,
    getbyIDCustomer,
    employeeLogin,
    supplierLogin,
    deleteStoreById,
    getStore,
    updateStoreById,
    getSupplier,
    deleteSupplierById,
    updateSupplierById,
    getEmployee,
    deleteEmployeeById,
    updateEmployeeById

}