import { useEffect, useRef, useState } from 'react'

import { useNavigate } from "react-router-dom"

import styles from "./CreateWorkerModal.module.css"


const CreateWorkerModal = ({ open, onClose, data }) => {
    const modalRef = useRef(null)

    const companyRole = localStorage.getItem("companyRole")

    const navigate = useNavigate()

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
                <h3>Аккаунт успешно создан</h3>
                <div>
                    <p className={styles.inpTitle}>Почта аккаунта</p>
                    <span>{data ? data.email : ""}</span>
                </div>
                <div>
                    <p className={styles.inpTitle}>Отдел аккаунта</p>
                    <span>{data ? data.departament : ""}</span>
                </div>
                <div>
                    <p className={styles.inpTitle}>Код аккаунта</p>
                    <div className={styles.codeBlocks}>
                        {
                            data?.code?.split("")?.map((item) => (
                                <div className={styles.codeBlock}>
                                    <p>{item}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={styles.btnsWrap}>
                    <button onClick={onClose}>
                        Создать новый аккаунт
                    </button>
                    <button onClick={() => {
                        if (companyRole === "super") {
                            navigate("/super-profile")
                        } else {
                            navigate("/hr_profile")
                        }

                    }
                    }>
                        Выйти
                    </button>
                </div>


            </div>

        </dialog>
    )
}

export default CreateWorkerModal

