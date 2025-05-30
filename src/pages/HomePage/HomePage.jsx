import { useEffect } from 'react'
import ProgressBlock from '../../components/progressBlock/ProgressBlock'
import Table from '../../components/table/Table'
import { useUser } from '../../store'
import ResultBlock from '../../ui/resultBlock/ResultBlock'

import styles from "./HomePage.module.css"

const HomePage = () => {

    const { tasks } = useUser(state => state.internship)
    const getProfile = useUser(state => state.getProfile)

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <div className={styles.main}>
            <div>
                <div>
                    <h3 className={styles.tableTitle}>Мои задачи</h3>
                    <Table tasks={tasks} />
                </div>
                <div className={styles.secondTableWrap}>
                    <h3 className={styles.tableTitle}>История задач</h3>
                    <Table time={true} tasks={tasks} />
                </div>
            </div>

            <div>
                <ProgressBlock />
                <ResultBlock />
            </div>

        </div>
    )
}

export default HomePage