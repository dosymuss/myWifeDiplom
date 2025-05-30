import { useUser } from '../../store';
import ProgressDiagramm from '../../ui/progressDiagram/ProgressDiagramm';
import styles from './ProgressBlock.module.css';


const ProgressBlock = () => {

    const internship = useUser(state => state.internship)

    const { progress } = internship


    return (
        <div className={styles.main}>
            <h3 className={styles.title}>Прогресс</h3>
            <div className={styles.contentBlock}>
                <div>
                    <div className={styles.textBlock} style={{ marginBottom: "15px" }}>
                        <p>Название:</p>
                        <p>{progress?.name}</p>
                    </div>
                    <div className={styles.textBlock} >
                        <p>Срок сдачи:</p>
                        <p>{progress?.dedline}</p>
                    </div>

                </div>

                <ProgressDiagramm percentage={progress?.percent} />

            </div>

        </div>
    )
}

export default ProgressBlock