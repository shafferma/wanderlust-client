import axios from 'axios';

/** 
 * create instance of axios. 
 * set our base url and headers so we dont have to repeat our code*/

const ApiProvider = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

/**
 * Intercept outgoing requests and add our 
 * Users token if available
 */

 ApiProvider.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    // if toke exists we attach to outgoing request
    if (token) {
        config.headers['Authorization'] = token
    }
    return config
 })

 export default ApiProvider;