import { useEffect } from 'react'
import SearchInp from '../../components/SearchPage/searchInp/SearchInp'
import Table from '../../components/table/Table'
import { useUser } from '../../store'

import styles from "./SearchPage.module.css"
import { useTask } from '../../store/task'

const SearchPage = () => {
   
    const fetchGetTasks = useTask(state=>state.fetchGetTasks)
    const tasks = useTask(state=>state.tasks)

    useEffect(() => {
        fetchGetTasks()
    }, [])



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