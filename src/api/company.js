import { mainInstance } from ".";

export const getCompanies = async () => {
    try {
        const res = await mainInstance.get("");
        return res.data;
    } catch (error) {

        throw new Error(
            error.response?.data?.message || "Ошибка сервера"
        );
    }
};
