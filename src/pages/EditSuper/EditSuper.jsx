import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import Button from "../../ui/button/Button"
import Input from "../../ui/input/Input"
import { useSuper } from "../../store/supervisor"

import { validationForProfile } from "../../code/validation"
import imageSceleton from "../../assets/profileEdit/imageSceleton.svg"
import { editSuperProfile } from "../../api/supervisor"

import styles from "./EditSuper.module.css"


const ImageBlock = ({ image }) => {
    return (
        <div>
            <p className={styles.imageText}>Мой аватар</p>
            {
                image ?
                    <img className={styles.image} src={image} alt="" />
                    :
                    <div className={styles.sceleton}>
                        <img src={imageSceleton} alt="" />
                    </div>
            }
        </div>
    )
}



const EditSuper = () => {

    const [image, setImage] = useState("")
    const [queryErr, setQueryErr] = useState(null)

    const supervisor = useSuper(state => state.supervisor)
    const supervisors = useSuper(state => state.supervisors)
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: supervisor ? supervisor.name : "",
            birthday: supervisor ? supervisor.birthday : "",
            email: supervisor ? supervisor.email : "",
            image: supervisor ? supervisor.image : "",
        },
        validateOnChange: true,
        validationSchema: validationForProfile,
        onSubmit: (values) => {
            console.log(values);

            const updatedSupervisors = supervisors.map(item =>
                item.id === supervisor.id ? { ...item, ...values } : item
            );

            const newSuper = {
                supervisor: updatedSupervisors
            };

            editSuperProfile(newSuper)
                .then((res) => {
                    navigate("/super-profile")
                })
                .catch((err) => {
                    setQueryErr(err.message);
                });

        }
    })

    return (
        <div>
            <h2 className={styles.title}>Мой профиль</h2>
            <div className={styles.contentWrap}>
                <div className={styles.form}>
                    <Input name={"name"} value={formik.values.name} err={formik.errors.name} onChange={formik.handleChange} onBlur={formik.handleBlur} inpTitle={"Мое имя"} placeholder={"Мое имя"} />
                    <Input name={"birthday"} value={formik.values.birthday} err={formik.errors.birthday} onChange={formik.handleChange} onBlur={formik.handleBlur} inpTitle={"День рождения"} placeholder={"19.04.2004"} />
                    <Input name={"email"} value={formik.values.email} err={formik.errors.email} onChange={formik.handleChange} onBlur={formik.handleBlur} inpTitle={"Моя почта"} placeholder={"test@gmail.com"} />
                    <Input name={"image"} value={formik.values.image} err={formik.errors.image} onChange={(e) => {
                        formik.handleChange(e)
                        setImage(e.target.value)
                    }} onBlur={formik.handleBlur} inpTitle={"Мой аватар"} placeholder={"https://..."} />
                    <Button type="submit" onClick={formik.handleSubmit} text={"Сохранить изменения"} disabled={!formik.isValid} />
                    {queryErr && <p className="error-text">{queryErr}</p>}
                </div>
                <ImageBlock image={formik.values.image ? formik.values.image : image} />
            </div>
        </div>
    )
}

export default EditSuper