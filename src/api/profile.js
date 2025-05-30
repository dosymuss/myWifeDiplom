import { mainInstance } from ".";


export const getMyProfile = async () => {
    try {
        const res = await mainInstance.get("/users/1")
        return res.data
    } catch (error) {
        throw error
    }
}

export const postProfile = async () => {
    try {
        const res = await mainInstance.post("/users/1")
        return res.data
    } catch (error) {
        throw error
    }
}

export const editProfile = async ( obj ) => {
    try {
        const res = await mainInstance.patch("/users/1", obj)
        return res.data
    } catch (error) {
        throw error
    }
}