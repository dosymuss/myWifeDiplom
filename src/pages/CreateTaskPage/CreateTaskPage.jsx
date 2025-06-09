import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import Input from "../../ui/input/Input"
import Button from "../../ui/button/Button"
import { useTask } from "../../store/task"
import { useCompany } from "../../store/company"
import { postNewTask } from "../../api/task"

import plusIcon from "../../assets/profile/plusIcon.svg"
import plusIconGreen from "../../assets/task/plusIconGreen.svg"
import deleteIcon from "../../assets/companyProfile/deleteIcon.svg"

import styles from "./CreateTaskPage.module.css"

const ListInp = ({ arr, setNewArr, item }) => {

    const handleDelete = () => {
        const newArr = arr.filter((inps) => inps.id !== item.id)
        setNewArr(newArr)
    }

    const handleChange = (e, id) => {
        const newArr = arr?.map((inps) => {
            if (inps.id === id) {
                return {
                    id: id,
                    value: e.target.value
                }
            } else {
                return inps
            }
        })

        setNewArr(newArr)
    }

    return (
        <div className={styles.listInp}>
            <input type="text" value={item.value} onChange={(e) => handleChange(e, item.id)} />
            <button onClick={handleDelete}>
                <img src={deleteIcon} alt="" />
            </button>
        </div>
    )
}

const ListInputs = ({ title, arr, setNewArr }) => {

    const handleAddNew = () => {
        setNewArr([...arr, {
            id: Date.now(),
            value: ""
        }])
    }


    return (
        <div>
            <div className={styles.titleWrap}>
                <p>{title}</p>
                <button onClick={handleAddNew}>
                    <img src={plusIcon} alt="" />
                </button>
            </div>
            <div className={styles.listInpWrap}>
                {
                    arr?.map((item) => (
                        <ListInp key={item.id} arr={arr} setNewArr={setNewArr} item={item} />
                    ))
                }
            </div>
        </div>
    )
}

const TasksWrap = ({ tehno, setTehno }) => {

    const [value, setValue] = useState("")

    const handleAddTechno = () => {
        if (value) {
            setTehno([...tehno, value])
            setValue("")
        }
    }

    const handleDelete = (value) => {
        const newArr = tehno.filter((item) => item !== value)
        setTehno(newArr)
    }

    return (
        <div>
            <label className={styles.tagInp}>
                <p>Технологии используемые в проекте:</p>
                <div className={styles.tagAddInp}>
                    <input value={value} onChange={(e) => setValue(e.target.value)} type="text" placeholder={"HTML"} />
                    <button onClick={handleAddTechno}>
                        <img src={plusIconGreen} alt="" />
                    </button>
                </div>
            </label>
            <div className={styles.tagsWrap}>
                {
                    tehno?.map((value) => (
                        <button onClick={() => handleDelete(value)} className={styles.tags}>{value}</button>
                    ))
                }
                {/* <p className={styles.tags}>css</p>
                <p className={styles.tags}>css</p> */}
            </div>
        </div>
    )
}

const CreateTaskPage = () => {

    const companyId = localStorage.getItem("companyId")

    const [tehno, setTehno] = useState([])
    const [steps, setSteps] = useState([])
    const [links, setLinks] = useState([])

    const companies = useCompany(state => state.companies)
    const fetchGetCompany = useCompany(state => state.fetchGetCompany)
    const getCompanyStatus = useCompany(state => state.getCompanyStatus)
    const getCompanyErr = useCompany(state => state.getCompanyErr)

    const tasks = useTask(state => state.tasks)
    const setTasks = useTask(state => state.setTasks)

    const [queryErr, setQueryErr] = useState(getCompanyErr)

    const navigate = useNavigate()

    useEffect(() => {
        fetchGetCompany()
    }, [])

    useEffect(() => {
        if (getCompanyStatus === "fulfilled") {
            const company = companies?.find((item) => item.id === companyId)
            if (!company) {
                setQueryErr("Ошибка сервера")
            }

            const tasksServer = company.tasks
            setTasks(tasksServer)
        }

    }, [companies, getCompanyStatus])


    const formik = useFormik({
        initialValues: {
            name: "",
            desc: "",
            done_desc: "",
            dedline: ""
        },
        onSubmit: (values) => {
            const obj = {
                ...values,
                id: String(Date.now()),
                tegnologies: tehno,
                steps: steps.map((item) => ({
                    is_done: false,
                    step_text: item.value
                })),
                links: links.map((item) => item.value),
                status: "open"
            };

            const queryObj = {
                tasks: [
                    ...tasks,
                    obj
                ]
            }

            postNewTask(queryObj).then((res) => {
                if (res.status === 200) {
                    navigate("/super-profile")
                }
            }).catch((err) => {
                setQueryErr(err.message)
            })


        }
    })

    return (
        <div className={styles.main}>
            <h2>Создание нового задания</h2>
            <div className={styles.mainInpsWrap}>
                <div className={styles.leftWrap}>
                    <Input inpTitle={"Название задачи:"} placeholder={"Название задачи"} name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    <Input inpTitle={"Описание задачи:"} placeholder={"Описание задачи"} area={true} name="desc" value={formik.values.desc} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    <ListInputs arr={steps} setNewArr={setSteps} title={"Шаги выполнения задачи:"} />
                    <ListInputs arr={links} setNewArr={setLinks} title={"Документация к  задаче:"} />
                </div>

                <div className={styles.rightWrap}>
                    <TasksWrap tehno={tehno} setTehno={setTehno} />
                    <Input inpTitle={"Описание к сдаче задачи:"} placeholder={"Описание к сдаче"} name="done_desc" value={formik.values.done_desc} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    <Input inpTitle={"Срок сдачи задачи:"} placeholder={"00.00.0000"} name="dedline" value={formik.values.dedline} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    <Button text={"Создать задание"} type="submit" onClick={formik.handleSubmit} />
                    {queryErr && <p className="error-text">{queryErr}</p>}
                </div>

            </div>

        </div>
    )
}

export default CreateTaskPage