import { mainInstance } from "."



export const getTaskInfo = async (id) => {
    try {
        const res = await mainInstance.get(`/tasks/${id}`)
        return res.data
    } catch (error) {
        throw error
    }
}

export const getTasks = async () => {
    try {
        const res = await mainInstance.get(`/tasks/`)
        return res.data
    } catch (error) {
        throw error
    }
}

export const postNewTask = async (task) => {
    try {
        const companyId = localStorage.getItem("companyId")
        const res = await mainInstance.patch(`/${companyId}`, task)
        return res
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Произошла ошибка при создании задания"
        );
    }
}