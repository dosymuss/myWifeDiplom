
import editIcon from "../../../assets/taskList/editIcon.svg"
import watchIcon from "../../../assets/taskList/watchIcon.svg"
import deleteIcon from "../../../assets/internList/deleteIcon.svg"
import usersIcon from "../../../assets/taskList/usersIcon.svg"

import styles from './TaskTable.module.css';



const TaskAction = () => {

    const buttons = [
        {
            img: deleteIcon
        },
        {
            img: editIcon
        },
        {
            img: watchIcon
        },
        {
            img: usersIcon
        },
    ]


    return (
        <div className={styles.internAction}>
            {
                buttons.map((item) => (
                    <button>
                        <img src={item.img} alt="" />
                    </button>
                ))
            }
        </div>
    )

}



const TaskTable = ({ style }) => {

    const tasks = [
        {
            title: "Верстка проекта лендинга",
            time: "3д",
            description: "Сверстай главный экран и футер",
        },
        {
            title: "Разработка панели администратора",
            time: "5д",
            description: "Сделай layout, навигацию и страницу логина",
        },
        {
            title: "Интеграция с API",
            time: "2д",
            description: "Подключи и протестируй авторизацию через API",
        },
        {
            title: "Адаптивная верстка",
            time: "4д",
            description: "Сделай адаптацию под планшеты и мобильные устройства",
        },
        {
            title: "Создание модальных окон",
            time: "1д",
            description: "Сделай модалку для подтверждения действия",
        },
        {
            title: "Настройка маршрутизации",
            time: "2д",
            description: "Добавь маршруты и защити приватные страницы",
        },
        {
            title: "Оптимизация изображений",
            time: "1д",
            description: "Добавь lazy loading и конвертацию в WebP",
        },
        {
            title: "Стилизация компонентов",
            time: "3д",
            description: "Применить дизайн систему ко всем компонентам",
        }
    ];



    return (
        <div className={styles.container} style={style}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Название задачи</th>
                        <th>Время</th>
                        <th>Описание задачи</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.title}>
                            <td>{task.title}</td>
                            <td>{task.time}</td>
                            <td>{task.description}</td>
                            <td>
                                <TaskAction />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskTable;
