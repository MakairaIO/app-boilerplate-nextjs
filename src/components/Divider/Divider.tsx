import React from 'react'
import styles from '@/components/Divider/Divider.module.scss'

interface DividerProps {
  mode?: 'horizontal' | 'vertical'
}

const Divider: React.FC<DividerProps> = ({ mode = 'horizontal' }) => {
  return <hr className={styles.divider} />
}

Divider.displayName = 'Divider'
export { Divider }
