import { mainInstance } from ".";


export const editSuperProfile = async (obj) => {
    try {
        const companyId = localStorage.getItem("companyId")
        const res = await mainInstance.patch(`/${companyId}`, obj)
        return res
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Произошла ошибка при исправлении"
        );
    }
}

export const createInternAccount = async (obj) => {
    try {
        const companyId = localStorage.getItem("companyId")
        const res = await mainInstance.patch(`/${companyId}`, obj)
        return res
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Произошла ошибка при создании аккаунта"
        );
    }
}