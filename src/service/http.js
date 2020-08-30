import { environment }  from '../environments/environment';
import axios from 'axios';

const url = environment.apiURL;

export const get = (apiUrl, data=null) =>{
  let qryString = `${url}${apiUrl}`;
  if(data !== null){
    const keys = Object.keys(data);
    keys.forEach((key, i) => qryString += `${i===0 ? '?' : '&'}${key}=${data[key]}` )
  }

  const options = {
    method: 'GET',
    headers: { 'content-type': 'application/json','Authorization':sessionStorage.getItem('token') },
    url: qryString
  };
  // console.log(options)
   return axios(options)
    .then(function (response) {
      if(response.status !== 200){
        console.log(response);
      }
      return response.data;
      })
      .catch(function (error,res) {
        console.error(error);
        // res.redirect("/LoginForm")
      
       return error
      });
}

export const post = (apiUrl, data) =>{
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json','Authorization':sessionStorage.getItem('token') },
        data: data,
        url:`${url}${apiUrl}` ,
      };
   return axios(options)
    .then(function (response) {
        if(response.status !== 200){
          console.log(response);
        }
        return response.data;
      })
      .catch(function (error,res) {
        console.error(error);
        console.log("error",error)
        // alert("you are not Authorized person")
        // res.redirect("/LoginForm")

        return error
              });
}

export const put = (apiUrl) =>{
  const options = {
    method: 'PUT',
    headers: { 'content-type': 'application/json','Authorization':sessionStorage.getItem('token') },
    url:`${url}${apiUrl}`
  };
  console.log(options.url);
  return axios(options)
    .then(function (response) {
      if(response.status !== 200){
        console.log(response);
      }
      return response.data;
      })
      .catch(function (error,res) {
        console.error(error);
        // res.redirect("/LoginForm")

        return error
      });
}

export const delete_ = (apiUrl) =>{
  const options = {
    method: 'DELETE',
    headers: { 'content-type': 'application/json','Authorization':sessionStorage.getItem('token')  },
    url:`${url}${apiUrl}`
  };
  console.log(options.url)
  return axios(options)
    .then(function (response) {
      if(response.status !== 200){
        console.log(response);
      }
      return response.data;
      })
      .catch(function (error,res) {
        console.error(error);
        // res.redirect("/LoginForm")
        return error
      });
}

export default {
  get,
  post,
  put,
  delete: delete_
};

