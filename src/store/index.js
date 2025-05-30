import { create } from "zustand"
import { editProfile, getMyProfile } from "../api/profile"

export const useUser = create((set) => ({
    profile: {},
    profileStatus: "",
    editProfileStatus: "",
    internship: {},
    searchResult:{},
    getProfile: async () => {
        try {
            set({ profileStatus: "pending" })
            const res = await getMyProfile()

            set({ profile: res })
            set({ internship: res.internship })
            set({ profileStatus: "fulfilled" })

        } catch (error) {
            set({ profileStatus: "rejected" })

        }
    },
    fetchEditProfile: async (obj) => {
        console.log(obj);

        try {
            set({ editProfileStatus: "pending" })
            const res = await editProfile(obj)
            set({ editProfileStatus: "fulfilled" })


        } catch (error) {
            set({ profileStatus: "rejected" })

        }
    }




}))