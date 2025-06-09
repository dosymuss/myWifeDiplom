import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from "formik";

import Input from "../../ui/olgInp/Input";
import Button from "../../ui/oldBtn/Button";
import AuthTitle from "../../ui/AuthTitle/AuthTitle";
import { validationRegister } from "../../code/validation";

import styles from "./SignUpForm.module.css";
import { register } from '../../api/hr';
import { useState } from 'react';

const SignUpForm = () => {

  const navigate = useNavigate()

  const [queryErr, setQueryErr] = useState(null)

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: ""
    },
    validationSchema: validationRegister,
    validateOnChange: true,
    onSubmit: (values) => {
      console.log(values);

      const createCompanyObj = {
        hr: {
          role: "hr",
          ...values
        },
        supervisor: [],
        interns: []
      }
      register(createCompanyObj).then((res) => {
        console.log(res);
        if (res.status === 201) {
          navigate("/login")
        }
      }).catch((err) => {
        console.log(err.message);
        setQueryErr(err.message)
      })
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
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={"Name"} title={"Your Name"}
          err={formik.errors.name} />

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
        {queryErr && <p className={styles.errText}>{queryErr}</p>}
        <p>Do you already have an account? <Link to="/login" >Sign in</Link>  </p>
      </div>
    </div>
  );
};

export default SignUpForm;
