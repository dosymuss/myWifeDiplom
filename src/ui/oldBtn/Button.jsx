import React from 'react'
import style from './Button.module.css'

const Button = ({ buttonText, ...props }) => {
  return (
    <button className={style.btn} {...props}>{buttonText}</button>
  )
}

export default Button