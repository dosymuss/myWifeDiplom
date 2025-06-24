import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useUser } from '../../store'
import ProgressBlock from '../../components/progressBlock/ProgressBlock'
import Table from '../../components/table/Table'
import ResultBlock from '../../ui/resultBlock/ResultBlock'

import styles from "./HomePage.module.css"
import { useCompany } from '../../store/company'

const HomePage = () => {

    const companies = useCompany(state => state.companies)
    const fetchGetCompany = useCompany(state => state.fetchGetCompany)
    const assignWorkTaskIfEmpty = useCompany(state => state.assignWorkTaskIfEmpty)

    const navigate = useNavigate()

    const isAuth = localStorage.getItem("is_auth")

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

    const clientId = localStorage.getItem("workerId")
    const department = localStorage.getItem("departament")
    const filteredTasks = getTasksByDepartment(companies, department);

    const my_profile = companies
        ?.flatMap(company => company.interns || [])
        ?.find(intern => intern?.id === clientId)

    console.log(my_profile);


    useEffect(() => {
        if (!isAuth) {
            navigate("/login")
        }
    }, [])

    useEffect(() => {
        fetchGetCompany()
    }, [])

    useEffect(() => {
        if (clientId) {
            assignWorkTaskIfEmpty(clientId);
        }
    }, []);

    const fullTasks = my_profile?.tasks?.length
        ? my_profile.tasks.map(internTask => {
            const full = filteredTasks.find(t => t.id === internTask.id)
            return {
                ...full,
                ...internTask
            }
        })
        : []

    const workTask = my_profile?.workTask;



    return (
        <div className={styles.main}>
            <div>
                <div>
                    <h3 className={styles.tableTitle}>Мои задачи</h3>
                    <Table clickable={true} tasks={fullTasks} workTask={workTask} />
                </div>
                <div className={styles.secondTableWrap}>
                    <h3 className={styles.tableTitle}>История задач</h3>
                    <Table time={true} tasks={fullTasks} workTask={workTask} />
                </div>
            </div>

            <div className={styles.statisticBlock}>
                <ProgressBlock />
                <ResultBlock />
            </div>

        </div>
    )
}

export default HomePage