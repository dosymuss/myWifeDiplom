import { useEffect } from 'react'
import SearchInp from '../../components/SearchPage/searchInp/SearchInp'
import Table from '../../components/table/Table'
import { useUser } from '../../store'

import styles from "./SearchPage.module.css"
import { useTask } from '../../store/task'
import { useCompany } from '../../store/company'

const SearchPage = () => {

    const companyId = localStorage.getItem("companyId")

    const companies = useCompany(state => state.companies)
    const getCompanyStatus = useCompany(state => state.getCompanyStatus)
    const fetchGetCompany = useCompany(state => state.fetchGetCompany)

    const tasks = useTask(state => state.tasks)
    const setTasks = useTask(state => state.setTasks)

    useEffect(() => {
        fetchGetCompany()
    }, [])

    useEffect(() => {
        if (getCompanyStatus === "fulfilled") {
            const company = companies?.find((item) => item.id === companyId)
            if (company) {
                setTasks(company.tasks)
            }
        }
    }, [companies, getCompanyStatus])



    return (
        <div>
            <SearchInp />
            <div className={styles.tableWrap}>
                <h3>Сделать Todo</h3>
                <Table tasks={tasks} style={{ maxWidth: "100%", height: "100%" }} desc={true} />
            </div>
        </div>
    )
}

export default SearchPage