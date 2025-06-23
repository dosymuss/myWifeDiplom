
import { Link } from "react-router-dom"

import styles from './Table.module.css';



const Table = ({ tasks, time, style, desc, workTask, clickable = false }) => {

    const calculateProgress = (steps) => {
        if (!steps || steps.length === 0) return 0;

        const completedSteps = steps.filter(step => step.is_done).length;
        const totalSteps = steps.length;

        // Вычисляем процент выполнения
        return (completedSteps / totalSteps) * 100;
    };

    return (
        <div className={styles.container} style={style}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Название задачи</th>
                        <th>Срок сдачи</th>
                        {time ?
                            <th>Оценка</th>
                            :
                            <th>Прогресс</th>
                        }
                        <th>Статус задачи</th>
                        {desc &&
                            <th>Описание задачи</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {tasks?.map(task => {



                        const percent = calculateProgress(task?.steps)

                        return (
                            <tr key={task.id}>
                                {
                                    clickable ?
                                        <Link className={styles.link} to={`/task/${task.id}`}>
                                            <td style={{ color: workTask && workTask?.id === task.id ? "var(--green80)" : "var(--black)" }}>{task.name}</td>
                                        </Link> :
                                        <td className={styles.name} style={{ color: workTask && workTask?.id === task.id ? "var(--green80)" : "var(--black)" }}>{task.name}</td>
                                }
                                <td>{task.dedline}</td>
                                {
                                    time ?
                                        <td>{task?.mark ? task?.mark : 0}</td>
                                        :
                                        <td>{percent ? percent : 0}%</td>

                                }
                                <td>
                                    <button style={{ backgroundColor: task?.status === "close" ? "var(--green60)" : "" }} className={styles.statusButton}>{task.status}</button>
                                </td>
                                {desc &&
                                    <td>{task.desc}</td>
                                }
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
