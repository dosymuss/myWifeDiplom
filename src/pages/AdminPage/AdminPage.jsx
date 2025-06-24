import { useEffect } from "react"
import { useCompany } from "../../store/company"
import styles from "./AdminPage.module.css"
import CompanyCard from "../../components/admin/CompanyCard/CompanyCard"

const AdminPage = () => {


  const companies = useCompany(state => state.companies)
  const fetchGetCompany = useCompany(state => state.fetchGetCompany)

  useEffect(() => {
    fetchGetCompany()
  }, [])

  return (
    <div className={styles.companyCardWrap}>
      {
        companies && companies.length > 0 &&
        companies.map((item) => (
          <CompanyCard key={item?.id} company={item} />
        ))
      }
    </div>
  )
}

export default AdminPage