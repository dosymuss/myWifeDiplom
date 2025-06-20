import { useEffect, useState } from "react"
import styles from "./TaskSteps.module.css"
import { useCompany } from "../../../store/company";

const TaskStep = ({ step, task }) => {
    const [check, setCheck] = useState(step?.is_done)

    const updateTask = useCompany(state => state.updateTask); // Функция для обновления задачи

    useEffect(() => {
        // Если check изменился, обновляем состояние шага
        if (check !== undefined) {
            const updatedStep = { ...step, is_done: check };

            // Находим задачу по ID и обновляем шаг
            const updatedTask = {
                ...task,
                steps: task?.steps?.map(s =>
                    s?.step_text === step?.step_text ? updatedStep : s
                )
            };
            // Обновляем задачу на сервере
            updateTask(updatedTask);
        }
    }, [check]);


    return (
        <label className={styles.stepWrap}>
            <input checked={check} onChange={() => setCheck(!check)} className={styles.inp} type="checkbox" />
            <span></span>
            <p>{step?.step_text}</p>
        </label>
    )
}

const TaskSteps = ({ steps, task }) => {
    return (
        <div>
            <h3>Шаги выполнения задачи:</h3>
            <div className={styles.stepsWrap}>
                {
                    steps && steps?.map((step) => (
                        <TaskStep step={step} task={task} />
                    ))
                }
            </div>
        </div>
    )
}

export default TaskSteps