import { useNavigate } from "react-router-dom"

import editIcon from "../../assets/profile/editIcon.svg"
import DocumInp from "../../components/profile/DocumInp/DocumInp"
import ProgressBlock from "../../components/progressBlock/ProgressBlock"
import ProfileTextItem from "../../ui/profile/profileTextItem/ProfileTextItem"
import ProgressDiagramm from "../../ui/progressDiagram/ProgressDiagramm"
import imageSceleton from "../../assets/profileEdit/imageSceleton.svg"

import styles from "./ProfilePage.module.css"
import { useUser } from "../../store"
import { useEffect } from "react"
import Spinner from "../../ui/spinner/Spinner"
import { useCompany } from "../../store/company"
import { useIntern } from "../../store/useIntern"

const ProfileTitle = () => {

    const navigate = useNavigate()

    return (
        <div className={styles.title}>
            <h2>Мой профиль</h2>
            <button onClick={() => navigate("/edit-profile")}>
                <img src={editIcon} alt="" />
            </button>
        </div>
    )
}

const ImageBlock = ({ image }) => {
    return (
        <div>
            <p className={styles.imageText}>Мой аватар</p>
            {
                image ?
                    <img className={styles.image} src={image} alt="" />
                    :
                    <div className={styles.sceleton}>
                        <img src={imageSceleton} alt="" />
                    </div>
            }
        </div>
    )
}

const RecomeLetter = ({ letter }) => {
    return (
        <div className={styles.recomeLetterMain}>
            <h3 className={styles.profileTextTitle}>Мое рекомендательное письмо</h3>
            {
                letter ?
                    <p className={styles.profileText}>{letter}</p>
                    :
                    <p className={styles.recomeNotText}>У вас еще нет рекомендательных писем от других компаний :(</p>

            }
        </div>
    )
}

const ProfilePage = () => {

    const companies = useCompany(state => state.companies)
    const getCompanyStatus = useCompany(state => state.getCompanyStatus)
    const fetchGetCompany = useCompany(state => state.fetchGetCompany)

    const intern = useIntern(state => state.intern)
    const interns = useIntern(state => state.interns)
    const setIntern = useIntern(state => state.setIntern)
    const setInterns = useIntern(state => state.setInterns)

    const internId = localStorage.getItem("workerId")
    const companyId = localStorage.getItem("companyId")

    useEffect(() => {
        fetchGetCompany()
    }, [])

    useEffect(() => {
        if (getCompanyStatus === "fulfilled") {
            if (getCompanyStatus === "fulfilled") {
                const company = companies?.find((item) => item.id === companyId)
                const findIntern = company?.interns?.find((item) => item?.id === internId)
                if (findIntern) {
                    setIntern(findIntern)
                    setInterns(company.interns)
                }
            }
        }
    }, [companies, getCompanyStatus])





    if (getCompanyStatus === "pending") {
        return (
            <div className={styles.spinnerWrap}>
                <Spinner style={{ width: "80px", height: "80px" }} />
            </div>
        )
    } else {
        return (
            <div className={styles.main}>
                <div>
                    <ProfileTitle />
                    <div className={styles.mainWrap}>
                        <div className={styles.profileTextWrap}>
                            <ProfileTextItem title={"Мое ФИО"} text={intern?.name ? intern.name : "Неизвестнов Неизвест Неизвестович"} />
                            <ProfileTextItem title={"Дата рождения:"} text={intern?.birthday ? intern.birthday : "00.00.0000"} />
                            <ProfileTextItem title={"Моя почта"} text={intern ? intern.email : "unknow@gmail.com"} />
                            <RecomeLetter letter={intern.recomeLetter} />
                            {/* <DocumInp docum={documents} /> */}
                        </div>
                    </div>
                </div>

                <ImageBlock image={intern ? intern.image : null} />



            </div>
        )
    }
}

export default ProfilePage