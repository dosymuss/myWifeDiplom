import { useNavigate } from "react-router-dom"

import editIcon from "../../assets/profile/editIcon.svg"
import DocumInp from "../../components/profile/DocumInp/DocumInp"
import ProgressBlock from "../../components/progressBlock/ProgressBlock"
import ProfileTextItem from "../../ui/profile/profileTextItem/ProfileTextItem"
import ProgressDiagramm from "../../ui/progressDiagram/ProgressDiagramm"
import imageSceleton from "../../assets/profileEdit/imageSceleton.svg"

import styles from "./ProfilePage.module.css"
import { useUser } from "../../store"
import { useEffect } from "react"
import Spinner from "../../ui/spinner/Spinner"

const ProfileTitle = () => {

    const navigate = useNavigate()

    return (
        <div className={styles.title}>
            <h2>Мой профиль</h2>
            <button onClick={() => navigate("/edit-profile")}>
                <img src={editIcon} alt="" />
            </button>
        </div>
    )
}

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

const RecomeLetter = ({ letter }) => {
    return (
        <div className={styles.recomeLetterMain}>
            <h3 className={styles.profileTextTitle}>Мое рекомендательное письмо</h3>
            {
                letter ?
                    <p className={styles.profileText}>{letter}</p>
                    :
                    <p className={styles.recomeNotText}>У вас еще нет рекомендательных писем от других компаний :(</p>

            }
        </div>
    )
}

const ProfilePage = () => {

    const getProfile = useUser(state => state.getProfile)
    const profileStatus = useUser(state => state.profileStatus)


    useEffect(() => {
        getProfile()
    }, [])
    const profile = useUser(state => state.profile)

    const { name, birthday, email, recomeLetter, documents, image, progress } = profile


    console.log(profile);




    if (profileStatus === "pending") {
        return (
            <div className={styles.spinnerWrap}>
                <Spinner style={{ width: "80px", height: "80px" }} />
            </div>
        )
    } else {
        return (
            <div>

                <ProfileTitle />

                <div className={styles.mainWrap}>
                    <div className={styles.profileTextWrap}>
                        <ProfileTextItem title={"Мое ФИО"} text={name ? name : "Неизвестнов Неизвест Неизвестович"} />
                        <ProfileTextItem title={"Дата рождения:"} text={birthday ? birthday : "00.00.0000"} />
                        <ProfileTextItem title={"Моя почта"} text={email ? email : "unknow@gmail.com"} />
                        <RecomeLetter letter={recomeLetter} />
                        <DocumInp docum={documents} />
                    </div>


                    <ImageBlock image={image ? image : null} />

                </div>



            </div>
        )
    }
}

export default ProfilePage