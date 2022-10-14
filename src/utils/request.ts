import axios from 'axios'
const request = axios.create({
  baseURL: 'http://localhost:3300',
  timeout: 1000
})

// Add a request interceptor
request.interceptors.request.use(config =>{
  // Do something before request is sent
  const token= window.localStorage.getItem('token')
  if(token){
    if(config&&config.headers){
      config.headers.authorization=token
    }
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
request.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

export default request