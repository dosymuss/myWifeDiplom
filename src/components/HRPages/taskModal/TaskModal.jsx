import { useEffect, useRef } from "react";
import styles from "./TaskModal.module.css"


const TaskModal = ({ companies, onClose, open }) => {
    const modalRef = useRef(null)

    // Получаем все открытые задачи
    const openTasks = companies.flatMap(company => company.tasks?.filter(task => task.status === 'open') || []);

    // Получаем все закрытые задачи
    const closedTasks = companies.flatMap(company => company.tasks?.filter(task => task.status === 'closed') || []);


    useEffect(() => {
        const dialog = modalRef.current
        if (!dialog) return

        const handleCancel = (e) => {
            e.preventDefault()
            onClose()
        }

        dialog.addEventListener("cancel", handleCancel)

        if (open) {
            if (!dialog.open) {
                dialog.showModal()
            }
        } else {
            if (dialog.open) {
                dialog.close()
            }
        }

        return () => {
            dialog.removeEventListener("cancel", handleCancel)
        }
    }, [open])

    // Функция закрытия при клике по фону (dialog)
    const handleBackdropClick = (e) => {
        if (e.target.tagName === 'DIALOG') {
            onClose()
        }
    }

    return (
        <dialog
            ref={modalRef}
            className={`${styles.dialog} ${styles.centered}`}
            onClick={handleBackdropClick}
        >
            <div className={styles.modalWrap}>
                <div className={styles.titleCloseWrap}>
                    <h3>Сотрудники компании</h3>
                    <button onClick={onClose}>
                        {/* <img src={closeIcon} alt="close" /> */}
                        close
                    </button>
                </div>

                <div className={styles.modalContent}>
                    <h2>Информация о задачах</h2>
                    <div className={styles.listsWrap}>
                        {/* Секция для открытых задач */}
                        <div className={styles.list}>
                            <h3>Открытые задачи</h3>
                            <ul>
                                {openTasks.map((task, index) => (
                                    <li key={index} className={styles.listItem}>
                                        <div className={styles.listItemHeader}>
                                            <div className={styles.listItemInfo}>
                                                <h4>{task.name}</h4>
                                                <p><strong>Статус:</strong> {task.status}</p>
                                                <p><strong>Дедлайн:</strong> {task.dedline}</p>
                                                <p><strong>Описание:</strong> {task.desc}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Секция для закрытых задач */}
                        <div className={styles.list}>
                            <h3>Закрытые задачи</h3>
                            <ul>
                                {closedTasks.map((task, index) => (
                                    <li key={index} className={styles.listItem}>
                                        <div className={styles.listItemHeader}>
                                            <div className={styles.listItemInfo}>
                                                <h4>{task.name}</h4>
                                                <p><strong>Статус:</strong> {task.status}</p>
                                                <p><strong>Дедлайн:</strong> {task.dedline}</p>
                                                <p><strong>Описание:</strong> {task.desc}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>



            </div>

        </dialog>
    )
};

export default TaskModal

