import { useState } from "react"
import styles from "./TaskSteps.module.css"

const TaskStep = ({ step }) => {
    const [check, setCheck] = useState(step?.is_done)
    return (
        <label className={styles.stepWrap}>
            <input checked={check} onChange={() => setCheck(!check)} className={styles.inp} type="checkbox" />
            <span></span>
            <p>{step?.step_text}</p>
        </label>
    )
}

const TaskSteps = ({ steps }) => {
    return (
        <div>
            <h3>Шаги выполнения задачи:</h3>
            <div className={styles.stepsWrap}>
                {
                    steps && steps?.map((step) => (
                        <TaskStep step={step} />
                    ))
                }
            </div>
        </div>
    )
}

export default TaskSteps