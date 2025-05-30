import LogoFragment from "../../components/LogoFragment/LogoFragment";
import SignInForm from "../../components/SignInForm/SignInForm";
import styles from "./LoginPage.module.css"

const LoginPage = () => {
  return (
    <div className={styles.mainPage}>
      <SignInForm />
      <LogoFragment />
    </div>
  );
};

export default LoginPage;