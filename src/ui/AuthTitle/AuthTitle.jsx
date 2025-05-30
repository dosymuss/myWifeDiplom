import React from 'react'
import styles from './AuthTitle.module.css'

const AuthTitle = ({title}) => {
  return (
        <h2 className={styles.authTitle}>{title}</h2>
  )
}

export default AuthTitle