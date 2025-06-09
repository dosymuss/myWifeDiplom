import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {  getHrInfo } from "../api/hr";

export const useHr = create(
    devtools(
        (set) => ({
            hrInfo: {},
            fetchHrStatus: "",
            fetchHrErr: "",
            fetchHrInfo: async () => {
                try {
                    set({ fetchHrStatus: "pending" })
                    const res = await getHrInfo()
                    set({ fetchHrStatus: "fulfilled" })
                    set({ hrInfo: res.data[0].hr })
                } catch (error) {
                    set({ fetchHrStatus: "rejected" })
                    set({ fetchHrErr: error.message })
                }
            }
        })
    )
)