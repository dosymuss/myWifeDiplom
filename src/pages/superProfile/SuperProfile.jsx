import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"

import editIcon from "../../assets/profile/editIcon.svg"
import plusIcon from "../../assets/companyProfile/plusIcon.svg"
import internIcon from "../../assets/companyProfile/intern.svg"
import { useHr } from "../../store/useHr"
import tasksIcon from "../../assets/companyProfile/allTasksIcon.svg"
import ProfileTextItem from "../../ui/profile/profileTextItem/ProfileTextItem"
import Spinner from "../../ui/spinner/Spinner"


import styles from "./SuperProfile.module.css"
import { useCompany } from "../../store/company"
import { useSuper } from "../../store/supervisor"

const ProfileTitle = () => {

    const navigate = useNavigate()

    return (
        <div className={styles.title}>
            <h2>Мой профиль</h2>
            <button onClick={() => navigate("/edit-super")}>
                <img src={editIcon} alt="" />
            </button>
        </div>
    )
}


const ProfileLinks = () => {
    const links = [

        {
            img: plusIcon,
            text: "Создать задание",
            link: "/create-task"
        },

        {
            img: plusIcon,
            text: "Создать аккаунт",
            link: "/create-worker"
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

const SuperProfile = () => {

    const companies = useCompany(state => state.companies)
    const getCompanyStatus = useCompany(state => state.getCompanyStatus)
    const fetchGetCompany = useCompany(state => state.fetchGetCompany)
    const setSuper = useSuper(state => state.setSuper)
    const supervisor = useSuper(state => state.supervisor)
    const supervisors = useSuper(state => state.supervisors)
    const setSupers = useSuper(state => state.setSupers)

    const superId = localStorage.getItem("workerId")
    const companyId = localStorage.getItem("companyId")


    useEffect(() => {
        fetchGetCompany()
    }, [])

    useEffect(() => {
        if (getCompanyStatus === "fulfilled") {
            const company = companies?.find((item) => item.id === companyId)
            const findSupervisor = company?.supervisor?.find((item) => item?.id === superId)
            if (findSupervisor) {
                setSuper(findSupervisor)
                setSupers(company.supervisor)
            }
        }
    }, [companies, getCompanyStatus])


    if (getCompanyStatus === "pending") {
        return (
            <div className="spinner-wrap">
                <Spinner />
            </div>
        )
    } else {
        return (
            <div className={styles.main}>
                <div className={styles.content}>
                    <div>
                        <ProfileTitle />
                        <div className={styles.mainWrap}>
                            <div className={styles.profileTextWrap}>
                                <ProfileTextItem title={"Мое ФИО"} text={supervisor?.name ? supervisor.name : "Тест Тестов"} />
                                <ProfileTextItem title={"Дата рождения:"} text={supervisor?.birthday ? supervisor.birthday : "19.04.2004"} />
                                <ProfileTextItem title={"Моя почта"} text={supervisor ? supervisor.email : "nurzhan@gmail.com"} />

                                <ProfileLinks />


                            </div>



                        </div>
                    </div>


                    <div>
                        <div className={styles.imageBlock}>
                            <p>Мой аватар</p>
                            <img src={supervisor?.image ? supervisor.image : "https://i.pinimg.com/736x/87/fe/e3/87fee31c452cf1a7ee6e1b65afbac986.jpg"} alt="" />
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

export default SuperProfile