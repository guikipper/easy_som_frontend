'use client'

import styles from '../../styles/Dictionary.module.css'
import NoteIdentifier from '../../components/NoteIdentifier'
import IntervalIdentifier from '@/app/components/IntervalIdentifier'

const Theory: React.FC = () => {
  return (
    <div className={styles.dictionary}>
      <NoteIdentifier />
      <div className={styles.line}></div>
      <IntervalIdentifier />
    </div>
  )
}

export default Theory 