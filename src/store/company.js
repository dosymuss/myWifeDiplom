import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { getCompanies } from "../api/company";



export const useCompany = create(devtools(
    (set) => ({
        companies: [],
        getCompanyStatus: "",
        getCompanyErr: "",
        fetchGetCompany: async () => {
            try {
                set({ getCompanyStatus: "pending" })
                const res = await getCompanies()

                set({ companies: res })
                set({ getCompanyStatus: "fulfilled" })

            } catch (error) {
                set({ companyStatus: "rejected" })
                set({ getCompanyStatus: error?.message })
            }
        }
    })
))