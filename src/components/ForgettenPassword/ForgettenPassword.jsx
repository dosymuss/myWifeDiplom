import React from "react";
import { Link } from "react-router-dom";
import styles from "./ForgettenPassword.module.css";
import AuthTitle from "../../UI/AuthTitle/AuthTitle";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import waterImg from "../../assets/auth/water.jpg";

const ForgettenPassword = () => {
  return (
    <div className={styles.main}>
      <div className={styles.forgettenPassWrap}>
        <div className={styles.forgettenPassContent}>
          <AuthTitle title={"Forgetten password"} />
          <p>Запомните ваш пароль это важно :)</p>
          <Input
            placeholder={"Password"}
            props={"Your password"}
            password={true}
          />
          <Input
            placeholder={"Password"}
            props={"Confirm password"}
            password={true}
          />
          <Button buttonText={"Sign in"} />
        </div>
      </div>
      <img  className={styles.imgWater}  src={waterImg} alt="water" />
    </div>
  );
};

export default ForgettenPassword;
