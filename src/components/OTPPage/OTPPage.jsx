import React from "react";
import { Link } from "react-router-dom";
import styles from "./OTPPage.module.css";
import AuthTitle from "../../UI/AuthTitle/AuthTitle";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import waterImg from "../../assets/auth/water.jpg";
import PinInput from "../../UI/PinInput/PinInput";

const OTPPage = () => {
  return (
    <div className={styles.main}>
      <div className={styles.forgettenPassWrap}>
        <div className={styles.forgettenPassContent}>
          <AuthTitle title={"Forgetten password"} />
          <p className={styles.gmailTitle}>Confirm your e-mail</p>
          <p className={styles.pinInputTitle}>Your code</p>
          <PinInput />
          <Button buttonText={"Sign in"} />
        </div>
      </div>
      <img className={styles.imgWater} src={waterImg} alt="water" />
    </div>
  );
};

export default OTPPage;
