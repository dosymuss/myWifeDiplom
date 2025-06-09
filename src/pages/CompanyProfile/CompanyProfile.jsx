import { useEffect } from "react"
import TasksGraph from "../../components/HRPages/tasksGraph/TasksGraph"
import WorkersGraph from "../../components/HRPages/workersGraph/WorkersGraph"
import styles from "./CompanyProfile.module.css"
import { useHr } from "../../store/useHr"
import Spinner from "../../ui/spinner/Spinner"

const CompanyProfile = () => {
    const fetchHrInfo = useHr(state => state.fetchHrInfo)
    const fetchHrStatus = useHr(state => state.fetchHrStatus)

    useEffect(() => {
        fetchHrInfo()
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
                <TasksGraph />
                <WorkersGraph />
            </div>
        )
    }
}

export default CompanyProfile