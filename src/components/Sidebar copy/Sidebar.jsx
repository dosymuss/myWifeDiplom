import React from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
import logo from "../../assets/auth/logo.svg";
import VacancyIcon from "../../assets/sidebar/VacancyIcon";
import SearchIcon from "../../assets/sidebar/SearchIcon";
import ChatsIcon from "../../assets/sidebar/ChatsIcon";
import FavoritesIcon from "../../assets/sidebar/FavoritesIcon";
import ava from "../../assets/sidebar/ava.jpg"

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarWrap}>
        <div className={styles.mainLogo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles.sidebarItem}>
          <Link to={"/vacancy"}>
            <VacancyIcon /> <span>Вакансии</span>
          </Link>
        </div>
        <div className={styles.sidebarItem}>
          <Link to={"/search"}>
            <SearchIcon />
            <span>Поиск</span>
          </Link>
        </div>
        <div className={styles.sidebarItem}>
          <Link to={"/chats"}>
            <ChatsIcon />
            <span>Чаты</span>
          </Link>
        </div>
        <div className={styles.sidebarItem}>
          <Link to={"/favorites"}>
            <FavoritesIcon />
            <span>Избранные</span>
          </Link>
        </div>

        <div className={styles.profile}><img src={ava} alt="" /><div>N.Zh</div></div>
      </div>
    </div>
  );
};

export default Sidebar;
