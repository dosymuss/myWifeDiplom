import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import deleteIcon from "../../../assets/internList/deleteIcon.svg"
import editIcon from "../../../assets/internList/writeLetter.svg"
import { useCompany } from "../../../store/company";

import styles from './SuperTable.module.css';


const SuperAction = ({ internId, company, companyId }) => {
    const navigate = useNavigate()

    const deleteSuper = useCompany(state => state.deleteSuper)

    const handleDelete = () => {
        const otherSupers = company?.supervisor?.filter(item => item?.id !== internId)
        const newCompany = {
            ...company,
            supervisor: otherSupers
        }
        deleteSuper(companyId, newCompany, otherSupers)
        navigate(0)
        navigate("/admin")
    };

    return (
        <div className={styles.internAction}>
            <button onClick={handleDelete}>
                <img src={deleteIcon} alt="Удалить" />
            </button>
            <button onClick={() => navigate(`/admin-edit-super/${companyId}/${internId}`)}>
                <img src={editIcon} alt="Удалить" />
            </button>

        </div>
    );
};

const SuperTable = ({ style }) => {
    const companies = useCompany(state => state.companies);
    const fetchGetCompany = useCompany(state => state.fetchGetCompany);

    const { id } = useParams()

    const ourCompany = companies?.find(item => item?.id === id)

    const supers = ourCompany?.supervisor

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
                    {supers?.map(task => (
                        <tr key={task.id}>
                            <td>{task.name}</td>
                            <td>{task.email}</td>
                            <td>{task.departament}</td>

                            <td>
                                <SuperAction
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

export default SuperTable;
