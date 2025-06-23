import { useState, useEffect } from "react";
import { useCompany } from "../../../store/company";
import styles from "./InternListItem.module.css";
import ProfileIcon from "../../../assets/sidebar/ProfileIcon";

const InternListItem = ({ task, internId }) => {
    const [mark, setMark] = useState(task?.mark || "");  // Инициализируем mark

    const companyId = localStorage.getItem("companyId");
    const companies = useCompany(state => state.companies);
    const updateCompanyInterns = useCompany(state => state.updateCompanyInterns);
    const updateTask = useCompany(state => state.updateTask);
    const ourCompany = companies?.find(item => item.id === companyId);

    // Функция обновления оценки задачи
 const handleChange = async (taskId, task, e) => {
    const newMark = e.target.value;

    const intern = ourCompany?.interns?.find(i => i.id === internId);
    if (!intern) return;

    const updatedUserTasks = intern.tasks.map(t =>
        t.id === taskId ? { ...t, mark: newMark } : t
    );

    const updatedIntern = {
        ...intern,
        tasks: updatedUserTasks
    };

    const updatedMainTask = ourCompany?.tasks?.map(t =>
        t.id === taskId ? { ...t, mark: newMark } : t
    );

    try {
        await updateCompanyInterns(internId, updatedIntern); // передаём одного интерна
        await updateTask(updatedMainTask);

        setMark(newMark); // обновляем только после успеха
        console.log("Task updated successfully!");
    } catch (err) {
        console.error("Error updating task:", err);
    }
};


    const company = companies?.find(item => item?.id === companyId)
    const intern = company?.interns?.find(item => item?.id === internId)

    return (
        <li key={task.id} className={styles.main}>
            <div className={styles.imgEmailWrap}>
                {
                    intern?.img ?
                        <img src={intern?.img} alt="" /> :
                        <div className={styles.internSceleton}>
                            <ProfileIcon />
                        </div>
                }
                <p>{intern?.email}</p>
            </div>
            <div className={styles.listItemСriterion}>
                <p>Статус:</p> <span style={{ color: task?.status === "open" ? "blue" : "var(--green80)" }}>{task.status ?? "—"}</span>
            </div>
            <div className={styles.listItemСriterion}>
                <p>Ссылка:</p> <a>{task.url ?? "—"}</a>
            </div>
            <input
                type="text"
                placeholder="0"
                value={mark} // Значение поля input
                onChange={(e) => handleChange(task.id, task, e)}
            />
        </li>
    );
};

export default InternListItem;
