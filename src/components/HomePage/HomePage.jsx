import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const { pathname } = useLocation();

  return (
    <div
      className={styles.homePage}
      
    >
      <Sidebar />
      <div className={styles.contentWrap}>
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;
