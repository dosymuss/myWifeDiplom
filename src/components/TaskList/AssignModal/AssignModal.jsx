import { useEffect, useRef } from 'react'
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
                <h3 className={styles.modalTitle}>Выберите стажёра</h3>
                <div className={styles.internList}>
                    {interns.map(intern => (
                        <button
                            key={intern.id}
                            className={styles.internItem}
                            onClick={() => onAssign(intern)}
                        >
                            {intern.name}
                        </button>
                    ))}
                </div>
                <button className={styles.closeBtn} onClick={onClose}>Закрыть</button>
            </div>
        </dialog>
    )
}

export default AssignModal
