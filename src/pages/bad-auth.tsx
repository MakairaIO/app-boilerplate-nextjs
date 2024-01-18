import { Text } from '@/components'
import styles from '@/styles/HomePage.module.scss'

export default function BadAuth() {
  return (
      <div className={styles.errorWrapper}>
        <img src='/img/makaira-logo.svg' alt="Makaira Logo" height={130}/>
        <Text element='h2' size='golf' weight='bold'>Wrong credentials!</Text>
      </div>
  )
}
