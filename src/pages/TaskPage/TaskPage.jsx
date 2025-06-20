import { useNavigate, useParams } from "react-router-dom"
import ProgressBlock from "../../components/progressBlock/ProgressBlock"
import TaskSteps from "../../components/task/taskSteps/TaskSteps"
import Button from "../../ui/button/Button"
import Input from "../../ui/input/Input"
import styles from "./TaskPage.module.css"
import { useEffect, useState } from "react"
import { useTask } from "../../store/task"
import { useUser } from "../../store"
import { useCompany } from "../../store/company"


const Tags = ({ text }) => {
    return (
        <p className={styles.tags}>{text}</p>
    )
}

const TaskPage = () => {

    const [url, setUrl] = useState("")

    const { id } = useParams()
    const companies = useCompany(state => state.companies);
    const fetchGetCompany = useCompany(state => state.fetchGetCompany);
    const updateTask = useCompany(state => state.updateTask);
    const updateCompanyInterns = useCompany(state => state.updateCompanyInterns);

    const navigate = useNavigate()

    const getTasksByDepartment = (companies, department) => {
        const tasks = [];

        companies.forEach((company) => {
            const allPeople = [...(company.interns || []), ...(company.supervisor || [])];

            const hasDepartmentMatch = allPeople.some(person => person.departament === department);

            if (hasDepartmentMatch && company.tasks) {
                tasks.push(...company.tasks);
            }
        });

        return tasks;
    };

    const department = localStorage.getItem("departament")
    const companyRole = localStorage.getItem("companyRole")
    const clientId = localStorage.getItem("workerId")

    const my_profile = companies
        ?.flatMap(company => company.interns || [])
        ?.find(intern => intern?.id === clientId)


    const filteredTasks = getTasksByDepartment(companies, department);


    const task = filteredTasks?.find((item) => item.id === id)

    useEffect(() => {
        fetchGetCompany()
    }, [])

    const handleEnd = async () => {
        if (!url) return; // Убедимся, что ссылка введена

        // Обновляем задачу у интерна
        const updatedIntern = {
            ...my_profile, // Копируем профиль интерна
            tasks: my_profile.tasks.map(task => {
                if (task.id === my_profile?.workTask?.id) {
                    // Обновляем задачу с нужным id
                    return {
                        ...task,
                        url: url, // Добавляем ссылку
                        status: "close" // Изменяем статус на "close"
                    };
                }
                return task; // Оставляем другие задачи без изменений
            }),
            workTask: null // Очищаем workTask, так как задача завершена
        };

        // Обновляем задачи в компании (глобальные задачи)
        const newTask = {
            ...task,
            url,
            status: "close",
            whoDone: clientId
        }

        // Сохраняем обновления в хранилище (обновляем профиль интерна и задачи компании)

        // Отправляем обновления на сервер
        try {
            // Пример запроса для обновления задачи на сервере
            await updateTask(newTask);

            // Обновляем профиль интерна на сервере
            await updateCompanyInterns(my_profile.id, updatedIntern);

            navigate("/")

            console.log("Данные успешно обновлены на сервере");
        } catch (err) {
            console.error("Ошибка при обновлении данных на сервере:", err);
        }
    };


    // Проверяем наличие задачи
    if (!task) return <p>Задача не найдена</p>;

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

                    <TaskSteps steps={task?.steps} task={task} />

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
                                <Input placeholder={"https://..."} style={{ width: "450px" }} value={url} onChange={(e) => setUrl(e.target.value)} />
                                <Button text={"Завершить"} style={{ width: "151px" }} disabled={!url} onClick={handleEnd} />
                            </div>
                        </label>

                    </div>

                </div>



            </div>
            {
                companyRole === "intern" &&
                <div className={styles.progtressBlock}>
                    <ProgressBlock />
                </div>
            }

        </div>

    )
}

export default TaskPage