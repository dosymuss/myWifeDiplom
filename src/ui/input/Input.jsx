import styles from "./Input.module.css"

const Input = ({ inpTitle, placeholder, style, area, err, ...props }) => {
    return (
        <div>
            <label style={style} className={styles.main}>
                <p>{inpTitle}</p>
                {
                    area ?
                        <textarea placeholder={placeholder} {...props}></textarea>
                        :
                        <input type="text" placeholder={placeholder} {...props} />
                }

            </label>
            {err && <p className={styles.errText}>{err}</p>}
        </div>

    )
}

export default Input