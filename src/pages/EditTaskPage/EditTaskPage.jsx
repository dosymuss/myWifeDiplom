import { useFormik } from "formik"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import Input from "../../ui/input/Input"
import Button from "../../ui/button/Button"
import { useTask } from "../../store/task"
import { useCompany } from "../../store/company"
import { postNewTask } from "../../api/task"

import plusIcon from "../../assets/profile/plusIcon.svg"
import plusIconGreen from "../../assets/task/plusIconGreen.svg"
import deleteIcon from "../../assets/companyProfile/deleteIcon.svg"

import styles from "./EditTaskPage.module.css"

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

const EditTaskPage = () => {

    const { id } = useParams()

    const companyId = localStorage.getItem("companyId")

    const [tehno, setTehno] = useState([])
    const [steps, setSteps] = useState([])
    const [links, setLinks] = useState([])

    const companies = useCompany(state => state.companies)
    const fetchGetCompany = useCompany(state => state.fetchGetCompany)
    const getCompanyStatus = useCompany(state => state.getCompanyStatus)
    const getCompanyErr = useCompany(state => state.getCompanyErr)
    const updateTask = useCompany(state => state.updateTask)

    const tasks = useTask(state => state.tasks)
    const setTasks = useTask(state => state.setTasks)

    const [queryErr, setQueryErr] = useState(getCompanyErr)

    const departament = localStorage.getItem("departament")
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
        if (id) {
            const taskToEdit = tasks.find(task => task.id === id);
            if (taskToEdit) {
                formik.setValues({
                    name: taskToEdit.name,
                    desc: taskToEdit.desc,
                    done_desc: taskToEdit.done_desc,
                    dedline: taskToEdit.dedline,
                });
                setTehno(taskToEdit.tegnologies || []);
                setSteps((taskToEdit.steps || []).map(step => ({
                    id: Date.now() + Math.random(),
                    value: step.step_text
                })));
                setLinks((taskToEdit.links || []).map(link => ({
                    id: Date.now() + Math.random(),
                    value: link
                })));
            }
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
            const newTaskObj = {
                ...values,
                id: id,
                tegnologies: tehno,
                steps: steps.map((item) => ({
                    is_done: false,
                    step_text: item.value
                })),
                links: links.map((item) => item.value),
                status: "open",
                departament: departament
            };

            const queryObj = {
                tasks: tasks.map(task => task.id === id ? newTaskObj : task)
            };

            const promise = updateTask(newTaskObj)


            promise.then((res) => {
                if (res.status === 200 || res.status === 201) {
                    navigate("/super-profile");
                }
            }).catch((err) => {
                setQueryErr(err.message);
            });
        }
    })

    return (
        <div className={styles.main}>
            <h2>Редактирование задания</h2>
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

export default EditTaskPage