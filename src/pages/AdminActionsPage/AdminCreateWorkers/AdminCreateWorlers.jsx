import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"

import { generateSixDigitCode } from "../../../code/hrCode"
import Input from "../../../ui/input/Input"
import resetIcon from "../../../assets/hr/resetIcon.svg"

import Button from "../../../ui/button/Button"
import { createSuperAccount } from "../../../api/hr"
import { useCompany } from "../../../store/company"
import { createInternAccount } from "../../../api/supervisor"
import AdminWorkerModal from "../../../ui/AdminWorkerModal/AdminWorkerModal"

import styles from "./AdminCreateWorkers.module.css"

const AdminCreateWorkers = () => {


    const { id } = useParams()

    const { pathname } = useLocation()


    const departamentLocal = localStorage.getItem("departament")


    const [randomCode, setRandomCode] = useState("000000")
    const [email, setEmail] = useState("")
    const [departament, setDepartament] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const [data, setData] = useState(null)

    const companies = useCompany(state => state.companies)
    const getCompanyErr = useCompany(state => state.getCompanyErr)
    const fetchGetCompany = useCompany(state => state.fetchGetCompany)

    const [queryErr, setQueryErr] = useState(getCompanyErr)

    useEffect(() => {
        fetchGetCompany()
    }, [])


    const handleReset = () => {
        const randCode = generateSixDigitCode()
        setRandomCode(String(randCode))
    }



    const handleSubmit = () => {
        const company = companies.find(item => item?.id === id);

        if (!company) {
            setQueryErr("Компания не найдена");
            return;
        }

        const supervisor = company.supervisor;
        const interns = company.interns

        if (!Array.isArray(supervisor)) {
            setQueryErr("Ошибка данных: supervisor не является массивом");
            return;
        }

        const alreadyExists = supervisor.some(item => item.email === email);

        if (alreadyExists) {
            setQueryErr("Супервизор с таким email уже существует");
            return;
        }


        if (id && pathname.startsWith("/create-intern")) {
            const obj = {
                interns: [
                    ...interns,
                    {
                        id: String(Date.now()),
                        email,
                        code: randomCode,
                        departament: departamentLocal,
                        tasks: [],
                        workTask: [],
                        progress: {

                        },
                        recomeLetter: ""
                    },
                ],
            };

            createInternAccount(id, obj)
                .then((res) => {
                    // успешное добавление — можно, например, очистить форму или показать сообщение
                    setOpenModal(!openModal)
                    setData({
                        email: email,
                        code: randomCode,
                        departament: departament
                    })
                })
                .catch((err) => {
                    setQueryErr(err.message || "Ошибка при создании супервизора");
                });

        } else {
            const obj = {
                supervisor: [
                    ...supervisor,
                    {
                        id: String(Date.now()),
                        email,
                        code: randomCode,
                        departament: departament
                    },
                ],
            };

            createSuperAccount(id, obj)
                .then((res) => {
                    // успешное добавление — можно, например, очистить форму или показать сообщение
                    setOpenModal(!openModal)
                    setData({
                        email: email,
                        code: randomCode,
                        departament: departament
                    })
                })
                .catch((err) => {
                    setQueryErr(err.message || "Ошибка при создании супервизора");
                });
        }
    };


    return (
        <div className={styles.main}>
            <div className={styles.content}>
                <h2>Создание нового аккаунта</h2>
                <Input err={!email ? "Почта обязательна к заполнению" : ""} value={email} onChange={(e) => setEmail(e.target.value)} inpTitle={"Почта пользователя"} placeholder={"Укажите почту пользователя"} />
                <Input err={!departament ? "Отдел обязателен к заполнению" : ""} value={departament} onChange={(e) => setDepartament(e.target.value)} inpTitle={"Отдел пользователя"} placeholder={"Укажите отдел пользователя"} />
                <div className={styles.codeWrap}>
                    <div className={styles.titleWrap}>
                        <p className={styles.codeTitle}>Пароль от нового аккаунта</p>
                        <button onClick={handleReset} className={styles.resetBtn}>
                            <img src={resetIcon} alt="" />
                        </button>
                    </div>
                    <div className={styles.codeBlocks}>
                        {
                            randomCode?.split("")?.map((item) => (
                                <div className={styles.codeBlock}>
                                    <p>{item}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <Button onClick={handleSubmit} disabled={!email || randomCode === "000000"} text={"Создать"} />
                {queryErr && <p className="error-text">{queryErr}</p>}
            </div>
            <AdminWorkerModal data={data} open={openModal} onClose={() => setOpenModal(!openModal)} />
        </div>
    )
}

export default AdminCreateWorkers