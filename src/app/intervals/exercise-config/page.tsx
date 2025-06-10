'use client'

import styles from '../../styles/Exercise.module.css'
import ExerciseConfig from '../../components/ExerciseConfig'

const Exercise: React.FC = () => {
  return (
    <div className={styles.exercise}>
      <ExerciseConfig />
    </div>
  )
}

export default Exercise 