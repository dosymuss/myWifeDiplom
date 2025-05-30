import styles from "./Spinner.module.css"

const Spinner = ({ style }) => {
    return (
        <span style={style} className={styles.loader}></span>
    )
}

export default Spinner