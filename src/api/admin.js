import axios from "axios";

const adminInstance = axios.create({
    baseURL: "http://localhost:3004/admin"
})


export const getAdminData = async () => {
    try {
        const res = await adminInstance.get("/")
        return res
    } catch (error) {
        throw error
    }
}

