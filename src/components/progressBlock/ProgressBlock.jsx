import { useUser } from '../../store';
import { useCompany } from '../../store/company';
import ProgressDiagramm from '../../ui/progressDiagram/ProgressDiagramm';
import styles from './ProgressBlock.module.css';


const ProgressBlock = () => {

    const companies = useCompany(state => state.companies)

    const clientId = localStorage.getItem("workerId")

    const my_profile = companies
        ?.flatMap(company => company.interns || [])
        ?.find(intern => intern?.id === clientId)

    console.log(my_profile);

    const workTask = my_profile?.workTask;

    const task = companies
        ?.flatMap(company => company.tasks || [])
        ?.find(t => t.id === workTask?.id);

    const calculateProgress = (steps) => {
        if (!steps || steps.length === 0) return 0;

        const completedSteps = steps.filter(step => step.is_done).length;
        const totalSteps = steps.length;

        // Вычисляем процент выполнения
        return (completedSteps / totalSteps) * 100;
    };


    const percent = calculateProgress(task?.steps)



    return (
        <div className={styles.main}>
            <h3 className={styles.title}>Прогресс</h3>
            <div className={styles.contentBlock}>
                <div>
                    <div className={styles.textBlock} style={{ marginBottom: "15px" }}>
                        <p>Название:</p>
                        <p>{task?.name}</p>
                    </div>
                    <div className={styles.textBlock} >
                        <p>Срок сдачи:</p>
                        <p>{task?.dedline}</p>
                    </div>

                </div>

                <ProgressDiagramm percentage={percent ? percent : 0} />

            </div>

        </div>
    )
}

export default ProgressBlock