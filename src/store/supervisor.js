import { create } from "zustand";
import { devtools } from "zustand/middleware";


export const useSuper = create(
    devtools(
        (set) => ({
            supervisor: {},
            supervisors: {},
            setSuper: (obj) => {
                set({ supervisor: obj })
            },
            setSupers: (obj) => {
                set({ supervisors: obj })
            }
        })
    )
)