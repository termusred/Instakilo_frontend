import axios from "axios"

const api = axios.create({baseURL : "https://instakilodatabase-production.up.railway.app/" , headers : {"Content-Type" : "application/json"}})

export default api