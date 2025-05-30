import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"

import editIcon from "../../assets/profile/editIcon.svg"
import plusIcon from "../../assets/companyProfile/plusIcon.svg"
import internIcon from "../../assets/companyProfile/intern.svg"
import tasksIcon from "../../assets/companyProfile/allTasksIcon.svg"

import { useCompany } from "../../store/company"
import ProfileTextItem from "../../ui/profile/profileTextItem/ProfileTextItem"
import CompanyProfileProgress from "../../components/profile/companyProfileProgress/CompanyProfileProgress"

import styles from "./CompanyProfile.module.css"

const ProfileTitle = () => {

    const navigate = useNavigate()

    return (
        <div className={styles.title}>
            <h2>Профиль компании</h2>
            <button onClick={() => navigate("/edit-profile")}>
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
            text: "Новое задание",
            link: "/create-task"
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

const CompanyProfile = () => {

    const fetchGetCompany = useCompany(state => state.fetchGetCompany)
    const company = useCompany(state => state.company)
    const progress = useCompany(state => state.progress)

    useEffect(() => {
        fetchGetCompany()
    }, [])

    return (
        <div>
            <ProfileTitle />

            <div className={styles.mainWrap}>
                <div className={styles.profileTextWrap}>
                    <ProfileTextItem title={"Мое ФИО"} text={company ? company.name : "Тест Тестов"} />
                    <ProfileTextItem title={"Дата рождения:"} text={company ? company.birthday : "19.04.2004"} />
                    <ProfileTextItem title={"Моя почта"} text={company ? company.email : "nurzhan@gmail.com"} />
                    <ProfileTextItem title={"Наша компания:"} text={company ? company.about_company : "Нет описания компании"} />

                    <ProfileLinks />


                </div>

                <div>
                    <div className={styles.imageBlock}>
                        <p>Мой аватар</p>
                        <img src={company ? company.image : "https://i.pinimg.com/736x/87/fe/e3/87fee31c452cf1a7ee6e1b65afbac986.jpg"} alt="" />
                    </div>

                    <CompanyProfileProgress count={progress.count} no_done={progress.no_done} in_work={progress.in_work} completed={progress.completed} />

                </div>


            </div>



        </div>
    )
}

export default CompanyProfile