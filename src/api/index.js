import axios from "axios"


export const mainInstance = axios.create({
    baseURL: "http://localhost:3004/",
})
