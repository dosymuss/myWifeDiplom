import deleteIcon from "../../../assets/internList/deleteIcon.svg"
import accountIcon from "../../../assets/internList/accountIcon.svg"
import writeLetterIcon from "../../../assets/internList/writeLetter.svg"
import allTaskIcon from "../../../assets/internList/allTaskIcon.svg"
import closeIcon from "../../../assets/modal/xIcon.svg"

import styles from './InternTable.module.css';
import { useCompany } from "../../../store/company";
import { useEffect, useRef, useState } from "react";
import InternListItem from "../internListItem/InternListItem";

const TasksModal = ({ tasks, onClose, internId }) => {
    const modalRef = useRef(null);

    const companyId = localStorage.getItem("companyId");
    const companies = useCompany(state => state.companies);
    const updateCompanyInterns = useCompany(state => state.updateCompanyInterns);
    const updateTask = useCompany(state => state.updateTask);
    const ourCompany = companies?.find(item => item.id === companyId);


    useEffect(() => {
        const dialog = modalRef.current;
        if (!dialog) return;

        const handleCancel = (e) => {
            e.preventDefault();
            onClose();
        };

        dialog.addEventListener("cancel", handleCancel);

        if (!dialog.open) {
            dialog.showModal();
        }

        return () => {
            dialog.removeEventListener("cancel", handleCancel);
            if (dialog.open) {
                dialog.close();
            }
        };
    }, [onClose]);

    const handleBackdropClick = (e) => {
        if (e.target === modalRef.current) {
            onClose();
        }
    };

    // Обработчик изменения оценки


    return (
        <dialog
            ref={modalRef}
            className={`${styles.dialog} ${styles.centered}`}
            onClick={handleBackdropClick}
        >
            <div className={styles.modalContent}>
                <h3 className={styles.modalTitle}>Выберите задачу</h3>
                <div className={styles.taskList}>
                    <h3>Задания стажёра</h3>
                    <ul>
                        {tasks.map(task => (
                            <InternListItem key={task.id} task={task} internId={internId} />
                        )

                        )
                        }
                    </ul>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <img src={closeIcon} alt="" />
                    </button>
                </div>
            </div>
        </dialog>
    );
};

const InternAction = ({ internId, companyId, onShowTasks }) => {
    const deleteIntern = useCompany(state => state.deleteIntern);

    const handleDelete = () => {
        if (window.confirm("Вы уверены, что хотите удалить стажёра?")) {
            deleteIntern(companyId, internId);
        }
    };

    return (
        <div className={styles.internAction}>
            <button onClick={handleDelete}>
                <img src={deleteIcon} alt="Удалить" />
            </button>
            <button onClick={onShowTasks}>
                <img src={allTaskIcon} alt="Задания" />
            </button>
        </div>
    );
};

const InternTable = ({ style }) => {
    const companies = useCompany(state => state.companies);
    const fetchGetCompany = useCompany(state => state.fetchGetCompany);

    const [selectedInternTasks, setSelectedInternTasks] = useState(null);
    const [selectedInternId, setSelectedInternId] = useState(null);

    const getInternsByDepartment = (companies, department) => {
        const interns = [];

        companies.forEach(company => {
            const companyInterns = company.interns || [];

            companyInterns.forEach(intern => {
                if (intern.departament === department) {
                    interns.push(intern);
                }
            });
        });

        return interns;
    };

    const department = localStorage.getItem("departament");
    const clientId = localStorage.getItem("companyId");

    const filteredInterns = getInternsByDepartment(companies, department);

    useEffect(() => {
        fetchGetCompany();
    }, []);

    const role = localStorage.getItem("companyRole");

    return (
        <div className={styles.container} style={style}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ФИО</th>
                        <th>Почта</th>
                        <th>Отдел</th>
                        <th>Последнее задание</th>
                        {role === "super" && <th>Действия</th>}
                    </tr>
                </thead>
                <tbody>
                    {filteredInterns?.map(task => (
                        <tr key={task.id}>
                            <td>{task.name}</td>
                            <td>{task.email}</td>
                            <td>{task.departament}</td>
                            <td>{task.tasks?.length ? task.tasks[task.tasks.length - 1].id : "—"}</td>
                            {role === "super" && (
                                <td>
                                    <InternAction
                                        internId={task.id}
                                        companyId={clientId}
                                        onShowTasks={() => {
                                            setSelectedInternTasks(task.tasks);
                                            setSelectedInternId(task?.id);
                                        }}
                                    />
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedInternTasks && (
                <TasksModal
                    internId={selectedInternId}
                    tasks={selectedInternTasks}
                    onClose={() => setSelectedInternTasks(null)}
                />
            )}
        </div>
    );
};

export default InternTable;
