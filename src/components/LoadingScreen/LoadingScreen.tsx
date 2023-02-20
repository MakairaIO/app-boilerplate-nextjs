import { Spinner } from '@/components'
import styles from '@/components/LoadingScreen/LoadingScreen.module.scss'
function LoadingScreen() {
  return (
    <div className={styles.loadingScreen}>
      <Spinner />
    </div>
  )
}

export { LoadingScreen }
