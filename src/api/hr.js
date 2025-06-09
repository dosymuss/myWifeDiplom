import { mainInstance } from ".";

export const register = async (obj) => {
    try {
        const res = await mainInstance.post("", obj);

        if (res.status === 201) {
            localStorage.setItem("companyId", res.data?.id);
        } else {
            console.warn("Unexpected status code:", res.status);
        }

        return res;
    } catch (error) {

        throw new Error(
            error.response?.data?.message || "Произошла ошибка при регистрации"
        );
    }
};

export const getHrInfo = async () => {
    try {
        const companyId = localStorage.getItem("companyId")
        const res = await mainInstance.get(`/?id=${companyId}`)
        return res
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Произошла ошибка при регистрации"
        );
    }
}

export const edithHrInfo = async (obj) => {
    try {
        const companyId = localStorage.getItem("companyId")
        const res = await mainInstance.patch(`/${companyId}`, obj)
        return res
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Произошла ошибка при регистрации"
        );
    }
}

export const createSuperAccount = async (obj) => {
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



