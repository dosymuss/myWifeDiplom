import { NavLink } from "react-router-dom"
import logo from "../../assets/logo.svg"

import HomeIcon from "../../assets/sidebar/HomeIcon"
import ProfileIcon from "../../assets/sidebar/ProfileIcon"
import SearchIcon from "../../assets/sidebar/SearchIcon"
import Logout from "../../assets/sidebar/Logout"

import styles from "./Sidebar.module.css"


const SideItem = ({ img, text, path }) => {
    return (
        <NavLink to={path} className={({ isActive }) => isActive ? styles.sidebarItemActive : styles.sidebarItem} >
            {img}
            <p>{text}</p>
        </NavLink>
    )
}

const Sidebar = () => {

    const sidebarItems = [
        {
            img: <HomeIcon />,
            text: "Мои задачи",
            path: "/"
        },
        {
            img: <ProfileIcon />,
            text: "Профиль",
            path:"/profile"
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
                    sidebarItems.map((item) => (
                        <SideItem key={item.text} img={item.img} text={item.text} path={item.path} />
                    ))
                }
            </div>
            <div className={styles.logoutBtn}>
                <SideItem img={<Logout />} text={"Выйти"} />
            </div>


        </aside>
    )
}

export default Sidebar