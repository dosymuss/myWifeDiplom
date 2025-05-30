import styles from "./SearchInp.module.css"

const SearchInp = () => {
    return (
        <div className={styles.main}>
            <input type="text" placeholder="Найти потерявшуюся работу" />
            <button>
                Найти
            </button>
        </div>
    )
}

export default SearchInp