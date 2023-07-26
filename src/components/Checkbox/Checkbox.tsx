import React from 'react'
import styles from '@/components/Checkbox/Checkbox.module.scss'
import { Text } from '@/components/Text/Text'
import csx from 'classnames'

interface CheckboxProps {
  id?: string
  name: string
  label: string
  disabled?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  className?: string
  checked?: boolean,
  description?: string,
  error?: {
    message: string
  }
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  label,
  onChange,
  disabled = false,
  className = '',
  checked,
  description,
  error
}) => {
  
  const classes = csx(
    className,
    styles.wrapper,
    disabled ? styles.disabled : ''
  )

  return (
    <div className={classes}>
      <label htmlFor={id || name}>
        <input name={name} type="checkbox" id={id || name} checked={checked} onChange={onChange} disabled={disabled} />
        <span className={styles.checkmark}></span>
        <Text className={styles.text} weight="medium">
          {label}
        </Text>
      </label>
      {description && (
        <div className={styles.message}>{description}</div>
      )}
      {error && (
        <div
          className={csx(styles.message, styles.error)}
        >
          {error.message}
        </div>
      )}
    </div>
  )
}

Checkbox.displayName = 'Checkbox'

export { Checkbox }
