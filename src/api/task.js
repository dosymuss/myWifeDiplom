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
        const res = await mainInstance.post("/tasks/", task)
        return res
    } catch (error) {
        throw error
    }
}