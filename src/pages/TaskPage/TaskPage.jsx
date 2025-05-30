import { useParams } from "react-router-dom"
import ProgressBlock from "../../components/progressBlock/ProgressBlock"
import TaskSteps from "../../components/task/taskSteps/TaskSteps"
import Button from "../../ui/button/Button"
import Input from "../../ui/input/Input"
import styles from "./TaskPage.module.css"
import { useEffect } from "react"
import { useTask } from "../../store/task"
import { useUser } from "../../store"


const Tags = ({ text }) => {
    return (
        <p className={styles.tags}>{text}</p>
    )
}

const TaskPage = () => {

    const { id } = useParams()

    const fetchGetTaskInfo = useTask(state => state.fetchGetTaskInfo)
    const task = useTask(state => state.task)
    const getProfile = useUser(state => state.getProfile)

    useEffect(() => {
        fetchGetTaskInfo(id)
    }, [id])

    useEffect(() => {
        getProfile()
    }, [id])

    const links = ["https://redux-toolkit.js.org/", "https://redux-toolkit.js.org/", "https://redux-toolkit.js.org/"]
    return (
        <div className={styles.main}>
            <div className={styles.mainContentWrap}>
                <h2>{task?.name}</h2>
                <div className={styles.tagsWrap}>
                    {
                        task && task?.tegnologies && task?.tegnologies?.length > 0 &&
                        task?.tegnologies?.map((item) => (
                            <Tags text={item} />
                        ))
                    }

                </div>
                <div className={styles.taskText}>
                    <div>
                        <h3>Описание задания</h3>
                        <p>{task?.desc}</p>
                    </div>

                    <TaskSteps steps={task?.steps} />

                    <div>
                        <h3>Документация к  задаче:</h3>
                        <p>Документация, которая пригодиться при выполнении задачи:</p>
                        <ul className={styles.linkList}>
                            {task && task?.links?.length > 0 && task?.links.map((item) => (
                                <li><a href={item} target="_blank">{item}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3>Сдача задачи:</h3>
                        <p>{task?.done_desc}</p>

                        <label className={styles.labelWrap}>
                            <span>Ссылка на репозиторий:</span>
                            <div className={styles.repoInpWrap}>
                                <Input placeholder={"https://..."} style={{ width: "450px" }} />
                                <Button text={"Завершить"} style={{ width: "151px" }} />
                            </div>
                        </label>

                    </div>

                </div>



            </div>
            <div className={styles.progtressBlock}>
                <ProgressBlock />
            </div>

        </div>

    )
}

export default TaskPage