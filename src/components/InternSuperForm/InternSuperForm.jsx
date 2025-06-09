import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PinInput from '../../ui/PinInput/PinInput';
import { validationForInterns } from '../../code/validation';
import { useCompany } from '../../store/company';
import AuthTitle from '../../ui/AuthTitle/AuthTitle';
import Button from '../../ui/oldBtn/Button';
import Input from '../../ui/olgInp/Input';

import styles from './InternSuperForm.module.css';

const InternSuperForm = () => {

    const [otp, setOtp] = useState("")

    const companies = useCompany(state => state.companies)
    const getCompanyErr = useCompany(state => state.getCompanyErr)
    const [queryErr, setQueryErr] = useState(getCompanyErr)

    const navigate = useNavigate()


    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: validationForInterns,
        onSubmit: (values) => {
            const companyId = localStorage.getItem("companyId");
            const company = companies.find(item => item?.id === companyId);

            if (!company) {
                setQueryErr("Компания не найдена");
                return;
            }

            const { interns = [], supervisor = [] } = company;

            const intern = interns.find(item => item.email === values.email);
            const superv = supervisor.find(item => item.email === values.email);

            const foundUser = intern || superv;

            if (!foundUser) {
                setQueryErr("Пользователь не найден");
                return;
            }

            if (foundUser.code !== otp) {
                setQueryErr("Неверный код");
                return;
            }

            // Определяем роль
            const role = intern ? "intern" : "super";

            // Успешный вход
            localStorage.setItem("companyId", company.id);
            localStorage.setItem("companyRole", role);
            localStorage.setItem("userEmail", foundUser.email);
            localStorage.setItem("workerId", foundUser.id)
            localStorage.setItem("is_auth", JSON.stringify(true))

            if (role === "super") {
                navigate("/super-profile");
                localStorage.setItem("departament", foundUser.departament);
            } else {
                localStorage.setItem("departament", foundUser.departament);
                navigate("/profile");
            }

        }

    })

    return (
        <div className={styles.formMain}>
            <div className={styles.formContent}>
                <AuthTitle title={"Добро пожаловать !"} />
                <Input title={"Ваш email"} placeholder={"Введите вашу почту"} name="email" value={formik.values.email} err={formik.errors.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                <PinInput value={otp} setValue={setOtp} />
                <Button disabled={!formik.isValid || !otp} buttonText={"Войти"} type="submit" onClick={formik.handleSubmit} />
                {queryErr && <p className='error-text'>{queryErr}</p>}
            </div>
        </div>
    )
}

export default InternSuperForm