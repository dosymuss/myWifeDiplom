
import editIcon from "../../../assets/taskList/editIcon.svg"
import watchIcon from "../../../assets/taskList/watchIcon.svg"
import deleteIcon from "../../../assets/internList/deleteIcon.svg"
import usersIcon from "../../../assets/taskList/usersIcon.svg"

import styles from './TaskTable.module.css';
import { useCompany } from "../../../store/company";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AssignModal from "../AssignModal/AssignModal";



const TaskAction = ({ taskId }) => {
    const deleteTask = useCompany(state => state.deleteTask);
    const companies = useCompany(state => state.companies);
    const assignTaskToIntern = useCompany(state => state.assignTaskToIntern); // ↓ сделаем

    const [isModalOpen, setIsModalOpen] = useState(false);

    const allInterns = companies.flatMap(c => c.interns || []);

    const handleAssign = (intern) => {
        assignTaskToIntern(intern.id, taskId);
        setIsModalOpen(false);
    };

    const navigate = useNavigate()

    return (
        <div className={styles.internAction}>
            <button onClick={() => deleteTask(taskId)}>
                <img src={deleteIcon} alt="" />
            </button>
            <button onClick={() => navigate(`/edit-task/${taskId}`)}>
                <img src={editIcon} alt="" />
            </button>
            <button onClick={() => setIsModalOpen(true)}>Назначить</button>

            {isModalOpen && (
                <AssignModal
                    interns={allInterns}
                    onClose={() => setIsModalOpen(false)}
                    onAssign={handleAssign}
                />
            )}
        </div>
    );
};



const TaskTable = ({ style }) => {

    const companies = useCompany(state => state.companies);
    const fetchGetCompany = useCompany(state => state.fetchGetCompany);

    const getTasksByDepartment = (companies, department) => {
        const tasks = [];

        companies.forEach((company) => {
            const allPeople = [...(company.interns || []), ...(company.supervisor || [])];

            const hasDepartmentMatch = allPeople.some(person => person.departament === department);

            if (hasDepartmentMatch && company.tasks) {
                tasks.push(...company.tasks);
            }
        });

        return tasks;
    };

    const department = localStorage.getItem("departament")
    const filteredTasks = getTasksByDepartment(companies, department);

    useEffect(() => {
        fetchGetCompany()
    }, [])

    const role = localStorage.getItem("companyRole")


    return (
        <div className={styles.container} style={style}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Название задачи</th>
                        <th>Время</th>
                        <th>Описание задачи</th>
                        {
                            role === "super" &&
                            <th>Действия</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks?.map(task => (
                        <tr key={task.id}>

                            <td>
                                <Link className={styles.nameLink} to={`/task/${task.id}`}>
                                    {task.name}
                                </Link>
                            </td>
                            <td>{task.dedline}</td>
                            <td>{task.desc}</td>
                            {
                                role === "super" &&
                                <td>
                                    <TaskAction taskId={task.id} />
                                </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskTable;
