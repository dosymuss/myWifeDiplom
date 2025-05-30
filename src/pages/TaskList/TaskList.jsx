import SearchInp from "../../components/SearchPage/searchInp/SearchInp"
import TaskTable from "../../components/TaskList/TaskTable/TaskTable"

import styles from "./TaskList.module.css"

const TaskList = () => {
    return (
        <div>
            <h2 className={styles.mainTitle}>Список стажеров компании</h2>
            <SearchInp />
            <div className={styles.tableWrap}>
                <p>Задача: Верстка проекта</p>
                <TaskTable />
            </div>
        </div>
    )
}

export default TaskList