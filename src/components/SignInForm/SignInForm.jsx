import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from "formik"


import Input from '../../ui/olgInp/Input'
import Button from '../../ui/oldBtn/Button'
import AuthTitle from '../../ui/AuthTitle/AuthTitle'

import { validationLogin } from '../../code/validation'

import styles from './SignInForm.module.css'
import { useCompany } from '../../store/company'
import { useEffect, useState } from 'react'


const SignInForm = () => {

  const navigate = useNavigate()


  const companies = useCompany(state => state.companies)
  const getCompanyStatus = useCompany(state => state.getCompanyStatus)
  const getCompanyErr = useCompany(state => state.getCompanyErr)
  const fetchGetCompany = useCompany(state => state.fetchGetCompany)

  const [queryErr, setQueryErr] = useState(getCompanyErr)


  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: validationLogin,
    validateOnChange: true,
    onSubmit: (values) => {
      // console.log(companies);
      const company = companies.find(item => item?.hr?.email === values.email)

      if (!company || company?.hr?.password !== values.password) {
        setQueryErr("Ошибка в введенных данных");
        return;
      }

      // всё ок
      localStorage.setItem("companyId", company?.id);
      localStorage.setItem("companyRole", "hr");
      localStorage.setItem("is_auth", JSON.stringify(true));
      navigate("/profile-company");


    }
  })

  useEffect(() => {
    fetchGetCompany()
  }, [])


  return (
    <div className={styles.signInWrap}>
      <Link to="/worker-sign" className={styles.internLink}>Are you intern or supervisor?</Link>
      <div className={styles.signInContent}>
        <AuthTitle title={"Sign in"} />
        <Input placeholder={"Email"} title={"Your email"}
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          err={formik.errors.email}
        />
        <Input
          placeholder={"Password"}
          title={"Your password"}
          password={true}
          login={true}
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          err={formik.errors.password}
        />
        <Button disabled={!formik.isValid} buttonText={"Sign in"} onClick={formik.handleSubmit} />
        {queryErr && <p className={styles.errText}>{queryErr}</p>}
        <p>You don't have an account yet, <Link to="/register">register here</Link></p>
      </div>
    </div>
  )
}

export default SignInForm