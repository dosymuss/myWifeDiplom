import { create } from "zustand";
import { devtools } from "zustand/middleware";


export const useIntern = create(
    devtools(
        (set) => ({
            intern: {},
            interns: {},
            setIntern: (obj) => {
                set({ intern: obj })
            },
            setInterns: (obj) => {
                set({ interns: obj })
            }
        })
    )
)