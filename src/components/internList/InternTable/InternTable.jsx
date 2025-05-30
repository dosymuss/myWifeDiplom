
import deleteIcon from "../../../assets/internList/deleteIcon.svg"
import accountIcon from "../../../assets/internList/accountIcon.svg"
import writeLetterIcon from "../../../assets/internList/writeLetter.svg"
import allTaskIcon from "../../../assets/internList/allTaskIcon.svg"

import styles from './InternTable.module.css';



const InternAction = () => {

    const buttons = [
        {
            img: deleteIcon
        },
        {
            img: accountIcon
        },
        {
            img: writeLetterIcon
        },
        {
            img: allTaskIcon
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



const InternTable = ({ style }) => {

    const users = [
        {
            fullName: "Бакытова Нуржан",
            email: "NurzhanTest@gmail.com",
            progress: "70%",
            lastTask: "Верстка тест"
        },
        {
            fullName: "Исенов Тимур",
            email: "TimurIsenov@example.com",
            progress: "85%",
            lastTask: "Адаптив верстка"
        },
        {
            fullName: "Ким Айгерим",
            email: "aigerim.kim@example.com",
            progress: "60%",
            lastTask: "Формы и валидация"
        },
        {
            fullName: "Садыков Арсен",
            email: "arsen.sadykov@example.com",
            progress: "90%",
            lastTask: "React компоненты"
        }
    ];


    return (
        <div className={styles.container} style={style}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ФИО</th>
                        <th>Почта</th>
                        <th>Прогресс</th>
                        <th>Последнее задание</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(task => (
                        <tr key={task.fullName}>
                            <td>{task.fullName}</td>
                            <td>{task.email}</td>
                            <td>{task.progress}</td>
                            <td>{task.lastTask}</td>
                            <td>
                                <InternAction />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InternTable;
