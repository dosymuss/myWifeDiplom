import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"

import editIcon from "../../assets/profile/editIcon.svg"
import plusIcon from "../../assets/companyProfile/plusIcon.svg"
import internIcon from "../../assets/companyProfile/intern.svg"
import { useHr } from "../../store/useHr"
import tasksIcon from "../../assets/companyProfile/allTasksIcon.svg"
import ProfileTextItem from "../../ui/profile/profileTextItem/ProfileTextItem"
import Spinner from "../../ui/spinner/Spinner"


import styles from "./HrProfile.module.css"

const ProfileTitle = () => {

    const navigate = useNavigate()

    return (
        <div className={styles.title}>
            <h2>Профиль компании</h2>
            <button onClick={() => navigate("/edit-hr")}>
                <img src={editIcon} alt="" />
            </button>
        </div>
    )
}


const ProfileLinks = () => {
    const links = [
        {
            img: internIcon,
            text: "Список стажеров",
            link: "#"
        },
        {
            img: plusIcon,
            text: "Новый аккаунт",
            link: "/create-worker"
        },
        {
            img: tasksIcon,
            text: "Все задания",
            link: "#"
        }
    ]
    return (
        <div className={styles.linksWrap}>
            {
                links.map((item) => (
                    <Link to={item?.link}>
                        <img src={item.img} alt="" />
                        <p>{item.text}</p>
                    </Link>
                ))
            }
        </div>
    )
}

const HrProfile = () => {

    const fetchHrInfo = useHr(state => state.fetchHrInfo)
    const hrInfo = useHr(state => state.hrInfo)
    const fetchHrStatus = useHr(state => state.fetchHrStatus)

    useEffect(() => {
        fetchHrInfo()
    }, [])


    if (fetchHrStatus === "pending") {
        return (
            <div className="spinner-wrap">
                <Spinner />
            </div>
        )
    } else {
        return (
            <div>
                <ProfileTitle />

                <div className={styles.mainWrap}>
                    <div className={styles.profileTextWrap}>
                        <ProfileTextItem title={"Мое ФИО"} text={hrInfo ? hrInfo.name : "Тест Тестов"} />
                        <ProfileTextItem title={"Дата основания:"} text={hrInfo?.birthday ? hrInfo.birthday : "19.04.2004"} />
                        <ProfileTextItem title={"Моя почта"} text={hrInfo ? hrInfo.email : "nurzhan@gmail.com"} />
                        <ProfileTextItem title={"Наша компания:"} text={hrInfo ? hrInfo.company : "Нет описания компании"} />

                        <ProfileLinks />


                    </div>

                    <div>
                        <div className={styles.imageBlock}>
                            <p>Мой аватар</p>
                            <img src={hrInfo?.image ? hrInfo.image : "https://i.pinimg.com/736x/87/fe/e3/87fee31c452cf1a7ee6e1b65afbac986.jpg"} alt="" />
                        </div>
                    </div>


                </div>



            </div>
        )
    }

}

export default HrProfile