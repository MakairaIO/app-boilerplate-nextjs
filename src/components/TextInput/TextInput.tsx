import csx from 'classnames'
import React, {
  ChangeEventHandler,
  FocusEventHandler,
  FunctionComponent,
} from 'react'
import classNames from 'classnames'

import styles from '@/components/TextInput/TextInput.module.scss'

interface TextInputProps {
  label?: string
  defaultValue?: string
  description?: string
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>
  onFocus?: FocusEventHandler<HTMLInputElement>
  onKeyUp?: (e: any) => void
  name: string
  error?: {
    message: string
  }
  className?: string;
  type?: string
  style?: React.CSSProperties,
}

const TextInput: FunctionComponent<TextInputProps> = ({
  onChange,
  onBlur,
  onFocus,
  onKeyUp,
  name,
  label,
  defaultValue,
  description,
  error,
  className,
  placeholder,
  style
}) => {
  return (
    <div className={classNames(className, 'text-input', styles.textInput)} style={style}>
      {label && (
        <label className={styles.textInputLabel} htmlFor={name}>
          {label}
        </label>
      )}

      <div className={styles.textInputWrapper}>
        <input type='text' defaultValue={defaultValue} onChange={onChange} onBlur={onBlur} name={name} onFocus={onFocus} onKeyUp={onKeyUp} placeholder={placeholder}/>
      </div>

      {description && (
        <div className={styles.textInputDescription}>{description}</div>
      )}

      {error && (
        <div
          className={csx(styles.textInputDescription, styles.textInputError)}
        >
          {error.message}
        </div>
      )}
    </div>
  )
}

TextInput.displayName = 'TextInput'

export { TextInput }
