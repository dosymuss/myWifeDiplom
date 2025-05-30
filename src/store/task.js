import { create } from "zustand"
import { devtools } from "zustand/middleware"

import { getTaskInfo, getTasks, postNewTask } from "../api/task"


export const useTask = create(
    devtools(

        (set) => ({
            task: {},
            taskInfoStatus: "",
            postTaskStatus: "",
            tasks:[],
            fetchGetTaskInfo: async (id) => {
                try {
                    set({ taskInfoStatus: "pending" })

                    const res = await getTaskInfo(id)

                    set({ task: res })
                    set({ taskInfoStatus: "fulfilled" })

                } catch (error) {
                    set({ taskInfoStatus: "rejected" })

                }
            },
            fetchGetTasks: async () => {
                try {
                    set({ taskInfoStatus: "pending" })

                    const res = await getTasks()

                    set({ tasks: res })
                    set({ taskInfoStatus: "fulfilled" })

                } catch (error) {
                    set({ taskInfoStatus: "rejected" })

                }
            },
            fetchPostTask: async (obj) => {
                try {
                    set({ postTaskStatus: "pending" })
                    const res = await postNewTask(obj)
                    set({ postTaskStatus: "fulfilled" })
                } catch (error) {
                    set({ postTaskStatus: "rejected" })
                }
            }
        })

    )
)