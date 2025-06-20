import { useEffect, useState } from "react"
import TasksGraph from "../../components/HRPages/tasksGraph/TasksGraph"
import WorkersGraph from "../../components/HRPages/workersGraph/WorkersGraph"
import styles from "./CompanyProfile.module.css"
import { useHr } from "../../store/useHr"
import Spinner from "../../ui/spinner/Spinner"
import { useCompany } from "../../store/company"
import WorkersModal from "../../components/HRPages/workerModal/WorkersModal"
import TaskModal from "../../components/HRPages/taskModal/TaskModal"

const CompanyProfile = () => {
    const fetchHrInfo = useHr(state => state.fetchHrInfo)
    const fetchHrStatus = useHr(state => state.fetchHrStatus)

    useEffect(() => {
        fetchHrInfo()
    }, [])

    const [openModal, setOpenModal] = useState(false);
    const [taskModal, setTaskModal] = useState(false);
    const companies = useCompany(state => state.companies);
    const fetchGetCompany = useCompany(state => state.fetchGetCompany);

    // Вычисление количества стажеров и руководителей
    const getGraphData = () => {
        let supervisorsCount = 0;
        let internsCount = 0;

        companies.forEach(company => {
            supervisorsCount += company.supervisor?.length || 0;
            internsCount += company.interns?.length || 0;
        });

        return [
            { name: 'Руководители', value: supervisorsCount },
            { name: 'Стажеры', value: internsCount }
        ];
    };



    const data = getGraphData();

    const getTaskData = () => {
        let openTasksCount = 0;
        let closedTasksCount = 0;

        companies.forEach(company => {
            company.tasks?.forEach(task => {
                if (task.status === 'open') {
                    openTasksCount += 1;
                } else if (task.status === 'closed') {
                    closedTasksCount += 1;
                }
            });
        });

        return [
            { name: 'Открытые задачи', value: openTasksCount },
            { name: 'Закрытые задачи', value: closedTasksCount }
        ];
    };

    const taskData = getTaskData()


    const handleClick = () => {
        setOpenModal(true); // Открытие модального окна при клике
    };

    const handleTaskClick = () => {
        setTaskModal(true); // Открытие модального окна при клике
    };


    useEffect(() => {
        fetchGetCompany()
    }, [])




    if (fetchHrStatus === "pending") {
        return (
            <div className="spinner-wrap">
                <Spinner />
            </div>
        )
    }
    else {

        return (
            <div className={styles.main}>
                <div onClick={handleTaskClick}>
                    <TasksGraph data={taskData} />
                </div>
                <div onClick={handleClick}>
                    <WorkersGraph data={data} />
                </div>
                <WorkersModal onClose={() => setOpenModal(false)} companies={companies} open={openModal} />
                <TaskModal onClose={() => setTaskModal(false)} companies={companies} open={taskModal} />
            </div>
        )
    }
}

export default CompanyProfile