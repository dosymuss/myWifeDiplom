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

export const updateCompanyTasks = async (companyId, tasks) => {
    return await mainInstance.patch(`/${companyId}`, { tasks });
};



export const updateCompanyInterns = async (companyId, updatedInterns) => {
    const res = await mainInstance.patch(`/${companyId}`, {
        interns: updatedInterns
    });

    return res.data;
};

export const updateCompany = async (companyId, updateCompany) => {
    const res = await mainInstance.patch(`/${companyId}`, updateCompany);

    return res.data;
};


export const deleteCompany = async (id) => {
    try {
        const res = await mainInstance.delete(`/${id}`)
        return res
    } catch (error) {
        throw error
    }
}