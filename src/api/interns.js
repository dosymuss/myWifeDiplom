import { mainInstance } from ".";

export const editInternProfile = async (id, obj) => {
    try {
        const companyId = localStorage.getItem("companyId")
        const res = await mainInstance.patch(`/${id ? id : companyId}`, obj)
        return res
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Произошла ошибка при исправлении"
        );
    }
}