import csx from 'classnames'
import { FunctionComponent } from 'react'
import { FaSpinner } from 'react-icons/fa'

import styles from '@/components/Spinner/Spinner.module.scss'

interface SpinnerProps {
  size?: 'normal' | 'small' | 'large'
  className?: string
}

const Spinner: FunctionComponent<SpinnerProps> = ({
  size = 'normal',
  className,
}) => {
  return (
    <div className={csx(styles.spinner, styles[`spinner--${size}`], className)}>
      <FaSpinner />
    </div>
  )
}

export { Spinner }
