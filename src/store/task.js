import { create } from "zustand"
import { devtools } from "zustand/middleware"



export const useTask = create(
    devtools(
        (set) => ({
            task: {},
            tasks: [],
            setTasks: (obj) => {
                set({ tasks: obj })
            },
            setTask: (obj) => {
                set({ task: obj })
            }
        })
    )
)