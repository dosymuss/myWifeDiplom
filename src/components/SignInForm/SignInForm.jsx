import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from "formik"

import AuthTitle from '../../UI/AuthTitle/AuthTitle'
import Input from '../../ui/olgInp/Input'
import Button from '../../ui/oldBtn/Button'

import { validationLogin } from '../../code/validation'

import styles from './SignInForm.module.css'


const SignInForm = () => {

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: validationLogin,
    validateOnChange: true,
    onSubmit: (values) => {
      console.log(values);
      navigate("/profile-company")
    }
  })


  return (
    <div className={styles.signInWrap}>
      <a href="#" className={styles.internLink}>Are you intern?</a>
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
        <p>You don't have an account yet, <Link to="/register">register here</Link></p>
      </div>
    </div>
  )
}

export default SignInForm