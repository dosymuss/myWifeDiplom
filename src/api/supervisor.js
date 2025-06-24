import { mainInstance } from ".";


export const editSuperProfile = async (id, obj) => {
    try {
        const companyId = id || localStorage.getItem("companyId");

        if (!companyId) {
            throw new Error("Не удалось определить ID компании");
        }

        console.log(companyId);
        

        const res = await mainInstance.patch(`/${companyId}`, obj);
        return res;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Произошла ошибка при редактировании"
        );
    }
};


export const createInternAccount = async (id, obj) => {
    try {
        const companyId = localStorage.getItem("companyId")
        const res = await mainInstance.patch(`/${id ? id : companyId}`, obj)
        return res
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Произошла ошибка при создании аккаунта"
        );
    }
}