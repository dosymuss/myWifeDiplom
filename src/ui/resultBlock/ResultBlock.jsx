import { useUser } from "../../store"
import { useCompany } from "../../store/company";
import styles from "./ResultBlock.module.css"

const ResultBlock = () => {

    const companies = useCompany(state => state.companies);
    const workerId = localStorage.getItem("workerId");
    const companyId = localStorage.getItem("companyId");

    const getInternTaskStatistics = (intern) => {
        // Общее количество задач стажера
        const totalTasks = intern?.tasks?.length || 0;

        // Количество задач с статусом 'closed'
        const closedTasksCount = intern?.tasks?.filter(task => task.status === 'close').length || 0;

        return {
            totalTasks, // Общее количество задач
            closedTasksCount // Количество закрытых задач
        };
    };

    // Найдем нужную компанию и стажера
    const company = companies.find(company => company.id === companyId);
    const intern = company?.interns?.find(intern => intern.id === workerId);

    // Проверяем, найден ли стажер

    const { totalTasks, closedTasksCount } = getInternTaskStatistics(intern);




    return (
        <div className={styles.main}>
            <h3 className={styles.title}>Результаты</h3>
            <div className={styles.textBlocks}>
                <div className={styles.textBlock} style={{ marginBottom: "5px" }}>
                    <p>Количество проектов:</p>
                    <p>{totalTasks > 0 ? totalTasks : 0}</p>
                </div>
                <div className={styles.textBlock} >
                    <p>Выполнено:</p>
                    <p>{closedTasksCount > 0 ? closedTasksCount : 0}</p>
                </div>



            </div>

        </div>
    )
}

export default ResultBlock