import React from 'react'
import styles from '@/components/Checkbox/Checkbox.module.scss'
import { Text } from '@/components/Text/Text'
import csx from 'classnames'

interface CheckboxProps {
  name: string
  label: string
  disabled?: boolean
  onClick?: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  label,
  onClick,
  disabled = false,
}) => {
  
  const classes = csx(
    styles.wrapper,
    disabled ? styles.disabled : ''
  )

  return (
    <label className={classes} htmlFor={name}>
      <input name={name} type="checkbox" id={name} onClick={onClick} disabled={disabled} />
      <span className={styles.checkmark}></span>
      <Text className={styles.text} weight="medium">
        {label}
      </Text>
    </label>
  )
}

Checkbox.displayName = 'Checkbox'

export { Checkbox }
