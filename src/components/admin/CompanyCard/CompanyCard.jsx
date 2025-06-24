import { useNavigate } from "react-router-dom"
import { useCompany } from "../../../store/company"

import deleteIcon from "../../../assets/internList/deleteIcon.svg"
import editIcon from "../../../assets/internList/writeLetter.svg"
import plusIcon from "../../../assets/admin/plusIcon.svg"

import backImg from "../../../assets/admin/backImg.svg"

import styles from "./CompanyCard.module.css"

const CompanyCard = ({ company }) => {

    const navigate = useNavigate()

    const hr = company?.hr

    const zDeleteCompany = useCompany(state => state.zDeleteCompany)

    const handleDeleteCompany = () => {
        zDeleteCompany(company?.id)
    }

    return (
        <div className={styles.main}>

            <img className={styles.backImg} src={backImg} alt="" />

            <h2>{hr?.email}</h2>
            <h3>{hr?.name}</h3>

            <div className={styles.segmentWrap}>
                <p>Компания</p>

                <div className={styles.buttonWrap}>
                    <button onClick={handleDeleteCompany}>
                        <img src={deleteIcon} alt="" />
                    </button>
                    <button onClick={() => navigate(`/edit-company/${company?.id}`)}>
                        <img src={editIcon} alt="" />
                    </button>
                </div>
            </div>

            <div className={styles.segmentWrap}>
                <p>Руководители</p>

                <div className={styles.buttonWrap}>
                    <button onClick={() => navigate(`/super-list/${company?.id}`)}>
                        <img src={deleteIcon} alt="" />
                    </button>
                    <button onClick={() => navigate(`/create-super/${company?.id}`)}>
                        <img src={plusIcon} alt="" />
                    </button>
                    <button onClick={() => navigate(`/super-list/${company?.id}`)}>
                        <img src={editIcon} alt="" />
                    </button>
                </div>
            </div>

            <div className={styles.segmentWrap}>
                <p>Стажеры</p>

                <div className={styles.buttonWrap}>
                    <button onClick={() => navigate(`/admin-intern-list/${company?.id}`)}>
                        <img src={deleteIcon} alt="" />
                    </button>
                    <button onClick={() => navigate(`/create-intern/${company?.id}`)}>
                        <img src={plusIcon} alt="" />
                    </button>
                    <button onClick={() => navigate(`/admin-intern-list/${company?.id}`)}>
                        <img src={editIcon} alt="" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCard