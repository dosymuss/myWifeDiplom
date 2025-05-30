import React from 'react'
import styles from './CompanyProfileProgress.module.css';

const CompanyProfileProgress = ({ count, no_done, in_work, completed }) => {

    const texts = [
        {
            title: "Количество стажеров",
            text: count ? count : "12"
        },
        {
            title: "Просрочено задач",
            text: no_done ? no_done : "2"
        },
        {
            title: "Назначенно задач",
            text: in_work ? in_work : "24"
        },
        {
            title: "Выполнено задач",
            text: completed ? completed : "50"
        }
    ]

    return (
        <div className={styles.main}>
            <h2 className={styles.title}>Прогресс</h2>
            <div className={styles.parametersWrap}>
                {
                    texts.map((item) => (
                        <div key={item?.text}>
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default CompanyProfileProgress