import React from 'react'
import styles from "./LogoFragment.module.css"
import logo from '../../assets/auth/logo.svg'

const LogoFragment = () => {
  return (
    <div className={styles.logoFragmentWrap}> <img src={logo} alt="" /></div>
  )
}

export default LogoFragment