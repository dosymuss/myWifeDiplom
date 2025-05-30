import Spinner from "../spinner/Spinner"
import styles from "./Button.module.css"

const Button = ({ text, style, status, ...props }) => {
    return (
        <button style={style} {...props} className={styles.main}>
            {
                status ?
                    <Spinner style={{ width: "20px", height: "20px" }} /> :
                    text
            }
        </button>
    )
}

export default Button