import { useEffect } from "react"

import { useCompany } from "../../store/company"
import InternSuperForm from "../../components/InternSuperForm/InternSuperForm"
import LogoFragment from "../../components/LogoFragment/LogoFragment"

import styles from "./InternSuperSign.module.css"

const InternSuperSign = () => {
    const fetchGetCompany = useCompany(state => state.fetchGetCompany)

    useEffect(() => {
        fetchGetCompany()
    }, [])


    return (
        <div className={styles.mainPage}>
            <InternSuperForm />
            <LogoFragment />
        </div>
    )
}

export default InternSuperSign