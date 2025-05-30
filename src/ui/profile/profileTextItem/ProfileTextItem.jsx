import styles from "./ProfileTextItem.module.css"

const ProfileTextItem = ({ title, text, small }) => {
    return (
        <div className={styles.wrap}>
            <h3 className={styles.profileTextTitle}>{title}</h3>
            <p className={styles.profileText}>{text}</p>
        </div>
    )
}

export default ProfileTextItem