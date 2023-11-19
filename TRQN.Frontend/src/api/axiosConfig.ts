import axios from 'axios'

const https = "https://localhost:7033"
const http = "http://localhost:5012" 
const isSecure = false;

export const BASE_URL = isSecure? https : http

const api = axios.create({
    withCredentials: true,
    baseURL: BASE_URL

})

export default api