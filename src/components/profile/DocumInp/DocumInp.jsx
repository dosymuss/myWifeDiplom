

import documIcon from "../../../assets/profile/documIcon.svg"
import plusIcon from "../../../assets/profile/plusIcon.svg"

import styles from "./DocumInp.module.css"

const DocumInp = ({docum}) => {

    return (
        <div>
            <div className={styles.titleDiv}>
                <p>Your documents</p>
                <button>
                    <img src={plusIcon} alt="" />
                </button>
            </div>
            <div className={styles.documLinkWrap}>
                {
                    docum?.map((documItem) => (
                        <a className={styles.documLink} href="#">
                            <img src={documIcon} alt="" />
                            <span>{documItem.name}</span>
                        </a>
                    ))
                }
            </div>
        </div>
    )
}

export default DocumInp