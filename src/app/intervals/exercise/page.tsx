'use client'

import IntervalCard from '../../components/IntervalCard'
import styles from '../../styles/ExercisePage.module.css'

const Exercise: React.FC = () => {
  return (
    <div className={styles.exercisePage}>
      <IntervalCard />
    </div>
  )
}

export default Exercise 