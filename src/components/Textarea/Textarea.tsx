import { useState, useEffect, useRef, FunctionComponent } from 'react'
import classNames from 'classnames'
import styles from '@/components/Textarea/Textarea.module.scss'

type TextareaProps = React.PropsWithChildren<{
  value?: string;
  maxlength?: number;
  maxlengthDesc?: string;
  title?: string;
  placeholder?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  rows?: "auto" | number;
  onChange?: (value: string) => void;
  required?: boolean;
}>

type HandlerEvent = <K extends keyof HTMLElementEventMap>(this: HTMLTextAreaElement, ev: HTMLElementEventMap[K]) => any

const Textarea: FunctionComponent<TextareaProps> = ({
  value: propsValue,
  onChange,
  maxlength,
  maxlengthDesc,
  title,
  placeholder,
  description,
  error,
  disabled,
  rows,
  required,
}) => {

  const textarea = useRef(null)
  const [value, setValue] = useState(propsValue || '')
  const warningClass = maxlength && value?.length > maxlength ? styles['warning'] : ''

  useEffect(() => {
    setValue(propsValue || '')
  }, [propsValue])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    if (onChange) {
      onChange(e.target.value)
    }
  }


  //handle auto row textarea
  useEffect(() => {
    let observe: Function = () => { }
    // Support Explorer/Opera
    if ((window as any).attachEvent) {
      observe = function (element: HTMLTextAreaElement, event: keyof GlobalEventHandlersEventMap, handler: HandlerEvent | EventListenerOrEventListenerObject) {
        (element as any).attachEvent('on' + event, handler)
      }
    } else {
      observe = function (element: HTMLTextAreaElement, event: keyof GlobalEventHandlersEventMap, handler: HandlerEvent | EventListenerOrEventListenerObject) {
        element.addEventListener(event, handler, false)
      }
    }

    const init = () => {
      const text: HTMLTextAreaElement | null = textarea.current;
      if (!text) return

      function resize() {
        if (text) {
          text.style.height = 'auto'
          text.style.height = text.scrollHeight + 'px'
        }
      }
      /* 0-timeout to get the already changed text */
      function delayedResize() {
        window.setTimeout(resize, 0)
      }
      observe(text, 'change', resize)
      observe(text, 'cut', delayedResize)
      observe(text, 'paste', delayedResize)
      observe(text, 'drop', delayedResize)
      observe(text, 'keydown', delayedResize)
      resize()
    }

    if (rows === 'auto') {
      init()
    }
    // eslint-disable-next-line
  }, [])

  const classes = classNames(styles['textarea-input'], {
    [styles['textarea-input__has-error']]: error,
    [styles['textarea-input--auto-rows']]: rows === 'auto',
  })

  return (
    <div className={classes}>
      <div className={styles['textarea-input__label']}>
        {title && <label>{title}</label>}
        {!!maxlength && (
          <span className={styles['textarea-input__count']}>
            <span className={warningClass}>{value ? value.length : 0}</span>/
            {maxlength} {maxlengthDesc}
          </span>
        )}
      </div>
      <textarea
        ref={textarea}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        disabled={disabled}
        rows={rows === 'auto' ? 1 : rows}
        required={required}
      />
      {description && (
        <div className={styles["textarea-input__description"]}>{description}</div>
      )}
      {error && (
        <div
          className={classNames(
            styles["textarea-input__description"],
            styles["textarea-input__description--error"]
          )}
        >
          {error}
        </div>
      )}
    </div>
  )
}

export {
  Textarea
}