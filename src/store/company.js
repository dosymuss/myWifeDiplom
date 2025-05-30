import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getCompanyInfo } from "../api/company";



export const useCompany = create(devtools(
    (set) => ({
        company: {},
        companyStatus: "",
        progress: {},
        fetchGetCompany: async () => {
            try {
                set({ companyStatus: "pending" })
                const res = await getCompanyInfo()
                console.log(res);

                set({ company: res.profile })
                set({ progress: res.progress })
                set({ companyStatus: "fulfilled" })

            } catch (error) {
                set({ companyStatus: "rejected" })
            }
        }
    })
))