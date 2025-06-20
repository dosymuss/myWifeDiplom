import { useState, useEffect } from "react";
import { useCompany } from "../../../store/company";
import styles from "./InternListItem.module.css";

const InternListItem = ({ task, internId }) => {
    const [mark, setMark] = useState(task?.mark || "");  // Инициализируем mark

    const companyId = localStorage.getItem("companyId");
    const companies = useCompany(state => state.companies);
    const updateCompanyInterns = useCompany(state => state.updateCompanyInterns);
    const updateTask = useCompany(state => state.updateTask);
    const ourCompany = companies?.find(item => item.id === companyId);

    // Функция обновления оценки задачи
    const handleChange = async (id, task, e) => {
        const newMark = e.target.value; // Получаем новую оценку
        setMark(newMark); // Обновляем локальное состояние mark

        // Обновляем задачу пользователя
        const updatedUserTask = {
            ...task,
            mark: newMark,
        };

        // Обновляем задачу в основной коллекции задач
        const updatedMainTask = ourCompany?.tasks?.map(t =>
            t.id === id ? { ...t, mark: newMark } : t
        );

        // Обновляем задачи у интерна
        const updatedInterns = ourCompany?.interns?.map(intern => {
            if (intern.id === internId) {
                const updatedTasks = intern.tasks.map(t =>
                    t.id === id ? updatedUserTask : t
                );
                return { ...intern, tasks: updatedTasks };
            }
            return intern;
        });

        try {
            // Обновляем задачу в интерне
            await updateCompanyInterns(internId, updatedInterns);
            // Обновляем задачу в основной коллекции задач
            await updateTask(updatedMainTask);

            console.log("Task updated successfully!");
        } catch (err) {
            console.error("Error updating task:", err);
        }
    };

    return (
        <li key={task.id}>
            <strong>ID:</strong> {task.id} <br />
            <strong>Статус:</strong> {task.status ?? "—"}<br />
            <strong>Ссылка:</strong> {task.url ?? "—"}<br />
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
