import React from "react";
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from "formik";

import Input from "../../ui/olgInp/Input";
import Button from "../../ui/oldBtn/Button";
import AuthTitle from "../../ui/AuthTitle/AuthTitle";

import styles from "./SignUpForm.module.css";
import { validationRegister } from "../../code/validation";

const SignUpForm = () => {

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      nickname: "",
      email: "",
      password: "",
      confirm_password: ""
    },
    validationSchema: validationRegister,
    validateOnChange: true,
    onSubmit: (values) => {
      console.log(values);
      navigate("/login")


    }
  })

  return (
    <div className={styles.signInWrap}>
      <div className={styles.signInContent}>
        <AuthTitle title={"Sign up"} />
        <Input
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={"Email"} title={"Your email"}
          err={formik.errors.email} />

        <Input
          name="nickname"
          value={formik.values.nickname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={"Nickname"} title={"Your nickname"}
          err={formik.errors.nickname} />

        <Input
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}

          placeholder={"Password"}
          title={"Your password"}
          password={true}
          err={formik.errors.password}
        //   password={true}
        //   login={true}
        />
        <Input
          name="confirm_password"
          value={formik.values.confirm_password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}

          placeholder={"Confirm password"}
          title={"Confirm password"}
          password={true}
          err={formik.errors.confirm_password}
        // login={true}
        />
        <Button disabled={!formik.isValid} onClick={formik.handleSubmit} buttonText={"Sign up"} />
        <p>Do you already have an account? <Link to="/login" >Sign in</Link>  </p>
      </div>
    </div>
  );
};

export default SignUpForm;
