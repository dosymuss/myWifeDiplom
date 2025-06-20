import styles from "./SearchInp.module.css"

const SearchInp = ({ setSearchQuery }) => {
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value); // обновление состояния поиска
    }

    return (
        <div className={styles.main}>
            <input 
                type="text" 
                placeholder="Найти потерявшуюся работу" 
                onChange={handleInputChange} 
            />
            <button>
                Найти
            </button>
        </div>
    )
}

export default SearchInp
