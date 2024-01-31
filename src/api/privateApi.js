import axios from 'axios'

let baseURL

if (import.meta.env.PROD) baseURL = 'http://localhost:3500'
else baseURL = 'http://localhost:9000'

export const privateApi = axios.create({ baseURL: `${baseURL}/api` })
