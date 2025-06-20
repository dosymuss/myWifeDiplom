import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"

import logo from "../../assets/logo.svg"
import HomeIcon from "../../assets/sidebar/HomeIcon"
import ProfileIcon from "../../assets/sidebar/ProfileIcon"
import SearchIcon from "../../assets/sidebar/SearchIcon"
import Logout from "../../assets/sidebar/Logout"
import StatisticsIcon from "../../assets/sidebar/Statistics"
import ListIcon from "../../assets/sidebar/ListIcon"
import UsersIcon from "../../assets/sidebar/UsersIcon"

import styles from "./Sidebar.module.css"


const SideItem = ({ img, text, path, ...props }) => {
    return (
        <NavLink to={path} className={({ isActive }) => isActive ? styles.sidebarItemActive : styles.sidebarItem} {...props} >
            {img}
            <p>{text}</p>
        </NavLink>
    )
}

const Sidebar = () => {

    const role = localStorage.getItem("companyRole")

    const [sidebarItem, setSidebarItem] = useState([])


    useEffect(() => {
        if (role === "hr") {
            const sidebarItems = [
                {
                    img: <StatisticsIcon />,
                    text: "Статистика",
                    path: "/profile-company"
                },
                {
                    img: <ProfileIcon />,
                    text: "Профиль",
                    path: "/hr_profile"
                }
            ]
            setSidebarItem(sidebarItems)
        }
        if (role === "super") {
            const sidebarItems = [
                {
                    img: <ProfileIcon />,
                    text: "Профиль",
                    path: "/super-profile"
                },
                {
                    img: <ListIcon />,
                    text: "Задания",
                    path: "/task-list"
                },
                {
                    img: <UsersIcon />,
                    text: "Стажеры",
                    path: "/intern-list"
                },

                // {
                //     img: <ProfileIcon />,
                //     text: "Профиль",
                //     path: "/hr_profile"
                // }
            ]
            setSidebarItem(sidebarItems)
        }
        if (role === "intern") {
            const sidebarItems = [
                {
                    img: <HomeIcon />,
                    text: "Мои задачи",
                    path: "/"
                },
                {
                    img: <ProfileIcon />,
                    text: "Профиль",
                    path: "/profile"
                },
                {
                    img: <SearchIcon />,
                    text: "Поиск",
                    path: "/search"
                }
            ]
            setSidebarItem(sidebarItems)
        }
    }, [role])

    if (role === "hr") {

    }

    const sidebarItems = [
        {
            img: <HomeIcon />,
            text: "Мои задачи",
            path: "/"
        },
        {
            img: <ProfileIcon />,
            text: "Профиль",
            path: "/profile"
        },
        {
            img: <SearchIcon />,
            text: "Поиск",
            path: "/search"
        },

    ]

    return (
        <aside className={styles.sidebar}>
            <img src={logo} alt="" />
            <div className={styles.sideItemWrap}>
                {
                    sidebarItem.map((item) => (
                        <SideItem key={item.text} img={item.img} text={item.text} path={item.path} />
                    ))
                }
            </div>
            <div className={styles.logoutBtn}>
                <SideItem path={"/login"} img={<Logout />} text={"Выйти"} onClick={() => {
                    localStorage.removeItem("is_auth")
                }} />
            </div>


        </aside>
    )
}

export default Sidebar