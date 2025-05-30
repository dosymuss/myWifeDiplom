import React from 'react'
import styles from './Tags.module.css'

const Tags = ({tagsText}) => {
  return (
    <span className={styles.tagsWrap}>
{tagsText}
    </span>
  )
}

export default Tags