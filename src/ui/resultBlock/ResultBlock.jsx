import { useUser } from "../../store"
import styles from "./ResultBlock.module.css"

const ResultBlock = () => {

    const internship = useUser(state => state.internship)
    const { results } = internship

    return (
        <div className={styles.main}>
            <h3 className={styles.title}>Результаты</h3>
            <div className={styles.textBlocks}>
                <div className={styles.textBlock} style={{ marginBottom: "5px" }}>
                    <p>Количество проектов:</p>
                    <p>{results?.totalProjects}</p>
                </div>
                <div className={styles.textBlock} >
                    <p>Выполнено:</p>
                    <p>{results?.completed}</p>
                </div>
                <div className={styles.textBlock} >
                    <p>Дней стажировки осталось:</p>
                    <p>{results?.daysLeft}</p>
                </div>
                <div className={styles.textBlock} >
                    <p>Сколько длится стажировка:</p>
                    <p>{results?.totalDays}</p>
                </div>



            </div>

        </div>
    )
}

export default ResultBlock