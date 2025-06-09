import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useHr } from "../../store/useHr"
import DocumInp from "../../components/profile/DocumInp/DocumInp"
import Button from "../../ui/button/Button"
import Input from "../../ui/input/Input"

import { validationForProfile } from "../../code/validation"
import imageSceleton from "../../assets/profileEdit/imageSceleton.svg"

import styles from "./EditHrCompany.module.css"
import { edithHrInfo } from "../../api/hr"


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



const EditHrCompany = () => {

    const [image, setImage] = useState("")
    const [queryErr, setQueryErr] = useState(null)

    const hrInfo = useHr(state => state.hrInfo)
    const navigate = useNavigate()


    const formik = useFormik({
        initialValues: {
            name: hrInfo ? hrInfo.name : "",
            birthday: hrInfo ? hrInfo.birthday : "",
            email: hrInfo ? hrInfo.email : "",
            image: hrInfo ? hrInfo.image : "",
            company: hrInfo ? hrInfo.company : "",
        },
        validateOnChange: true,
        validationSchema: validationForProfile,
        onSubmit: (values) => {

            const newObj = {
                hr: {
                    ...hrInfo, ...values
                }
            }

            edithHrInfo(newObj).then((res) => {
                if (res.status === 200) {
                    navigate("/hr_profile")
                }
            }).catch((err) => {
                setQueryErr(err.message)
            })

        }
    })

    return (
        <div>
            <h2 className={styles.title}>Мой профиль</h2>
            <div className={styles.contentWrap}>
                <div className={styles.form}>
                    <Input name={"name"} value={formik.values.name} err={formik.errors.name} onChange={formik.handleChange} onBlur={formik.handleBlur} inpTitle={"Имя компании"} placeholder={"Имя компании"} />
                    <Input name={"birthday"} value={formik.values.birthday} err={formik.errors.birthday} onChange={formik.handleChange} onBlur={formik.handleBlur} inpTitle={"Дата основания"} placeholder={"19.04.2004"} />
                    <Input name={"email"} value={formik.values.email} err={formik.errors.email} onChange={formik.handleChange} onBlur={formik.handleBlur} inpTitle={"Моя почта"} placeholder={"test@gmail.com"} />
                    <Input area={true} name={"company"} value={formik.values.company} err={formik.errors.company} onChange={formik.handleChange} onBlur={formik.handleBlur} inpTitle={"История компании"} placeholder={"История компании"} />
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

export default EditHrCompany