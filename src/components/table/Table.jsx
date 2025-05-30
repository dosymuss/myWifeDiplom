
import { Link } from "react-router-dom"

import styles from './Table.module.css';



const Table = ({ tasks, time, style, desc }) => {

    // const tasks = [
    //     {
    //         name: 'Верстка проекта тест...',
    //         deadline: 'сегодня',
    //         progress: '70%',
    //         time: "2ч 45мин",
    //         status: 'Открытый',
    //         desc: "Сверстай блок и модалку ..."
    //     },
    //     {
    //         name: 'Верстка проекта тест...',
    //         deadline: 'сегодня',
    //         progress: '70%',
    //         time: "2ч 45мин",
    //         status: 'Открытый',
    //         desc: "Сверстай блок и модалку ..."
    //     },
    //     {
    //         name: 'Верстка проекта тест...',
    //         deadline: 'сегодня',
    //         progress: '70%',
    //         time: "2ч 45мин",
    //         status: 'Открытый',
    //         desc: "Сверстай блок и модалку ..."
    //     },
    //     {
    //         name: 'Верстка проекта тест...',
    //         deadline: 'сегодня',
    //         progress: '70%',
    //         time: "2ч 45мин",
    //         status: 'Открытый',
    //         desc: "Сверстай блок и модалку ..."
    //     },
    //     {
    //         name: 'Верстка проекта тест...',
    //         deadline: 'сегодня',
    //         progress: '70%',
    //         time: "2ч 45мин",
    //         status: 'Открытый',
    //         desc: "Сверстай блок и модалку ..."
    //     },
    //     {
    //         name: 'Верстка проекта тест...',
    //         deadline: 'сегодня',
    //         progress: '70%',
    //         time: "2ч 45мин",
    //         status: 'Открытый',
    //         desc: "Сверстай блок и модалку ..."
    //     },
    // ]

    return (
        <div className={styles.container} style={style}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Название задачи</th>
                        <th>Срок сдачи</th>
                        {time ?
                            <th>Время</th>
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
                    {tasks?.map(task => (
                        <tr key={task.id}>
                            <Link className={styles.link} to={`/task/${task.id}`}>
                                <td>{task.name}</td>
                            </Link>
                            <td>{task.dedline}</td>
                            {
                                time ?
                                    <td>{task.time}</td>
                                    :
                                    <td>{task.progress}%</td>

                            }
                            <td>
                                <button className={styles.statusButton}>{task.status}</button>
                            </td>
                            {desc &&
                                <td>{task.desc}</td>
                            }
                        </tr>

                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
