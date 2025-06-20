import SearchInp from "../../components/SearchPage/searchInp/SearchInp"
import TaskTable from "../../components/TaskList/TaskTable/TaskTable"

import styles from "./TaskList.module.css"

const TaskList = () => {
    return (
        <div>
            <h2 className={styles.mainTitle}>Список заданий компании</h2>
                <TaskTable />
        </div>
    )
}

export default TaskList