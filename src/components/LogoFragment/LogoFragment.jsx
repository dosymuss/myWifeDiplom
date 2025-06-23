import React from 'react'
import styles from "./LogoFragment.module.css"
import logo from '../../assets/logo.svg'

const LogoFragment = () => {
  return (
    <div className={styles.logoFragmentWrap}>
      <img src={logo} alt="" />
      <h1>InternFlow</h1>
    </div>
  )
}

export default LogoFragment