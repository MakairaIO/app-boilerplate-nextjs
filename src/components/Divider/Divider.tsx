import React from 'react'
import styles from '@/components/Divider/Divider.module.scss'

interface DividerProps {
  mode?: 'horizontal' | 'vertical'
}

const Divider: React.FC<DividerProps> = ({ mode = 'horizontal' }) => {

  const className = mode === 'vertical' ? styles.vertical : styles.horizontal;

  return <div className={className}></div>
}

Divider.displayName = 'Divider'
export { Divider }
