import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import deleteIcon from "../../../assets/internList/deleteIcon.svg"
import editIcon from "../../../assets/internList/writeLetter.svg"
import { useCompany } from "../../../store/company";

import styles from './AdminInternTable.module.css';


const InternAction = ({ internId, company, companyId }) => {
    const navigate = useNavigate()

    const deleteIntern = useCompany(state => state.deleteIntern)

    const handleDelete = () => {
        const otherInterns = company?.interns?.filter(item => item?.id !== internId)
        const newCompany = {
            ...company,
            interns: otherInterns
        }
        deleteIntern(companyId, newCompany, otherInterns)
        navigate(0)
        navigate("/admin")
    };

    return (
        <div className={styles.internAction}>
            <button onClick={handleDelete}>
                <img src={deleteIcon} alt="Удалить" />
            </button>
            <button onClick={() => navigate(`/admin-edit-intern/${companyId}/${internId}`)}>
                <img src={editIcon} alt="Удалить" />
            </button>

        </div>
    );
};

const AdminInternTable = ({ style }) => {
    const companies = useCompany(state => state.companies);
    const fetchGetCompany = useCompany(state => state.fetchGetCompany);

    const { id } = useParams()

    const ourCompany = companies?.find(item => item?.id === id)

    const interns = ourCompany?.interns

    useEffect(() => {
        fetchGetCompany();
    }, []);


    return (
        <div className={styles.container} style={style}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ФИО</th>
                        <th>Почта</th>
                        <th>Отдел</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {interns?.map(task => (
                        <tr key={task.id}>
                            <td>{task.name}</td>
                            <td>{task.email}</td>
                            <td>{task.departament}</td>

                            <td>
                                <InternAction
                                    internId={task.id}
                                    companyId={id}
                                    company={ourCompany}
                                />
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default AdminInternTable;
