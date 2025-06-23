import { useEffect, useRef } from "react";
import styles from "./WorkersModal.module.css"


const WorkersModal = ({ companies, onClose, open }) => {
    const modalRef = useRef(null)

    const companyId = localStorage.getItem("companyId")


    const findCompany = companies?.find(item => item?.id === companyId)



    const supervisors = findCompany?.supervisor || [];
    const interns = findCompany?.interns || [];


    useEffect(() => {
        const dialog = modalRef.current
        if (!dialog) return

        const handleCancel = (e) => {
            e.preventDefault()
            onClose()
        }

        dialog.addEventListener("cancel", handleCancel)

        if (open) {
            if (!dialog.open) {
                dialog.showModal()
            }
        } else {
            if (dialog.open) {
                dialog.close()
            }
        }

        return () => {
            dialog.removeEventListener("cancel", handleCancel)
        }
    }, [open])

    // Функция закрытия при клике по фону (dialog)
    const handleBackdropClick = (e) => {
        if (e.target.tagName === 'DIALOG') {
            onClose()
        }
    }

    return (
        <dialog
            ref={modalRef}
            className={`${styles.dialog} ${styles.centered}`}
            onClick={handleBackdropClick}
        >
            <div className={styles.modalWrap}>
                <div className={styles.titleCloseWrap}>
                    <h3>Сотрудники компании</h3>
                    <button onClick={onClose}>
                        {/* <img src={closeIcon} alt="close" /> */}
                        close
                    </button>
                </div>

                <div className={styles.modalContent} >
                    <h2>Информация о сотрудниках</h2>
                    <div className={styles.listsWrap}>
                        <div className={styles.list}>
                            <h3>Руководители</h3>
                            <ul>
                                {supervisors.map((supervisor, index) => (
                                    <li key={index}>
                                        {supervisor.email} - {supervisor.departament}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.list}>
                            <h3>Стажеры</h3>
                            <ul>
                                {interns.map((intern, index) => (
                                    <li key={index}>
                                        {intern.email} - {intern.departament}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

                </div>


            </div>

        </dialog>
    )
};

export default WorkersModal

