import { mainInstance } from ".";


export const getCompanyInfo = async () => {
    try {
        const res = await mainInstance.get("/company/")
        return res.data
    } catch (error) {
        throw error
    }
}