import InternTable from "../../components/internList/InternTable/InternTable"
import SearchInp from "../../components/SearchPage/searchInp/SearchInp"

import styles from "./InternList.module.css"

const InternList = () => {
    return (
        <div>
            <h2 className={styles.mainTitle}>Список стажеров компании</h2>
            <SearchInp />
            <div className={styles.tableWrap}>
                <p>Стажер: Бакытова Нуржан</p>
                <InternTable />
            </div>
        </div>
    )
}

export default InternList