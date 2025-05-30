import style from "./RegisterPage.module.css"
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import LogoFragment from '../../components/LogoFragment/LogoFragment'

const RegisterPage = () => {
  return (
    <div className={style.mainPage}>
      <SignUpForm />
      <LogoFragment />
    </div>
  )
}

export default RegisterPage