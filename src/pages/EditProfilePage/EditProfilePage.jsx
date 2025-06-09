import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import DocumInp from "../../components/profile/DocumInp/DocumInp"
import Button from "../../ui/button/Button"
import Input from "../../ui/input/Input"

import { validationForProfile } from "../../code/validation"
import imageSceleton from "../../assets/profileEdit/imageSceleton.svg"
import { editInternProfile } from "../../api/interns"
import { useIntern } from "../../store/useIntern"

import styles from "./EditProfilePage.module.css"


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



const EditProfilePage = () => {

    const [image, setImage] = useState("")
    const [queryErr, setQueryErr] = useState(null)


    const intern = useIntern(state => state.intern)
    const interns = useIntern(state => state.interns)

    const navigate = useNavigate()


    const formik = useFormik({
        initialValues: {
            name: intern ? intern.name : "",
            birthday: intern ? intern.birthday : "",
            email: intern ? intern.email : "",
            image: intern ? intern.image : ""
        },
        validateOnChange: true,
        validationSchema: validationForProfile,
        onSubmit: (values) => {
            console.log(values);

            const updatedInterns = interns.map(item =>
                item.id === intern.id ? { ...item, ...values } : item
            );

            console.log(updatedInterns);
            

            const newIntern = {
                interns: updatedInterns
            };

            console.log(newIntern);
            

            editInternProfile(newIntern)
                .then((res) => {
                    navigate("/profile")
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
                    <Input name={"name"} value={formik.values.name} err={formik.errors.name} onChange={formik.handleChange} onBlur={formik.handleBlur} inpTitle={"Мое ФИО"} placeholder={"ФИО"} />
                    <Input name={"birthday"} value={formik.values.birthday} err={formik.errors.birthday} onChange={formik.handleChange} onBlur={formik.handleBlur} inpTitle={"Дата рождения"} placeholder={"19.04.2004"} />
                    <Input name={"email"} value={formik.values.email} err={formik.errors.email} onChange={formik.handleChange} onBlur={formik.handleBlur} inpTitle={"Моя почта"} placeholder={"test@gmail.com"} />
                    <Input name={"image"} value={formik.values.image} err={formik.errors.image} onChange={(e) => {
                        formik.handleChange(e)
                        setImage(e.target.value)
                    }} onBlur={formik.handleBlur} inpTitle={"Мой аватар"} placeholder={"https://..."} />
                    <DocumInp />
                    <Button type="submit" onClick={formik.handleSubmit} text={"Сохранить изменения"} disabled={!formik.isValid} />
                    {queryErr && <p className="error-text">{queryErr}</p>}
                </div>
                <ImageBlock image={formik.values.image ? formik.values.image : image} />
            </div>
        </div>
    )
}

export default EditProfilePage