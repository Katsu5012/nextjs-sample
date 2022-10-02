import React from 'react'
import styles from './OverLay.module.css'

const OverLay = (props: { children?: React.ReactNode }) => {
  return <div className={styles.overlay}>{props.children}</div>
}

export default OverLay
