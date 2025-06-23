import { useEffect, useRef } from 'react'

import closeIcon from "../../../assets/modal/xIcon.svg"
import ProfileIcon from '../../../assets/sidebar/ProfileIcon'

import styles from "./AssignModal.module.css"

const AssignModal = ({ interns, onClose, onAssign }) => {
    const modalRef = useRef(null)

    useEffect(() => {
        const dialog = modalRef.current
        if (!dialog) return

        const handleCancel = (e) => {
            e.preventDefault()
            onClose()
        }

        dialog.addEventListener("cancel", handleCancel)

        // Открываем диалог, если он ещё не открыт
        if (!dialog.open) {
            dialog.showModal()
        }

        return () => {
            dialog.removeEventListener("cancel", handleCancel)
        }
    }, [])

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
            <div className={styles.modalContent}>
                <button onClick={onClose} className={styles.closeBtn}>
                    <img src={closeIcon} alt="" />
                </button>
                <h3 className={styles.modalTitle}>Выберите стажёра</h3>
                <div className={styles.internList}>
                    {interns.map(intern => (
                        <div className={styles.internItem}>
                            <div className={styles.imgEmailWrap}>
                                {
                                    intern?.img ?
                                        <img src={intern?.img} alt="" /> :
                                        <div className={styles.internSceleton}>
                                            <ProfileIcon />
                                        </div>
                                }
                                <p>{intern?.email}</p>
                            </div>

                            <button
                                key={intern.id}
                                className={styles.internBtn}
                                onClick={() => onAssign(intern)}
                            >
                                Назначить
                            </button>

                        </div>
                    ))}
                </div>
            </div>
        </dialog>
    )
}

export default AssignModal
