import { useState, useEffect, useRef, FunctionComponent } from 'react'
import classNames from 'classnames'
import styles from '@/components/Textarea/Textarea.module.scss'

type TextareaProps = React.PropsWithChildren<{
  value?: string;
  maxLength?: number;
  maxLengthDesc?: string;
  title?: string;
  placeholder?: string;
  description?: string;
  error?: {
    message: string
  }
  disabled?: boolean;
  rows?: "auto" | number;
  onChange?: (value: string) => void;
  required?: boolean;
  wrapperClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
}>

type HandlerEvent = <K extends keyof HTMLElementEventMap>(this: HTMLTextAreaElement, ev: HTMLElementEventMap[K]) => any

const Textarea: FunctionComponent<TextareaProps> = ({
  value = '',
  onChange,
  maxLength,
  maxLengthDesc,
  title,
  placeholder,
  description,
  error,
  disabled,
  rows,
  required,
  wrapperClassName,
  labelClassName,
  descriptionClassName,
}) => {

  const textarea = useRef(null)
  const warningClass = maxLength && value?.length > maxLength ? styles.warning : ''

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  const classes = classNames(styles['textarea-input'], 'textarea-input', wrapperClassName,
  {
    [styles['has-error']]: error,
    [styles['auto-rows']]: rows === 'auto',
  })

  return (
    <div className={classes}>
      <div className={classNames("label", labelClassName)}>
        {title && <label>{title}</label>}
        {!!maxLength && (
          <span className="count">
            <span className={warningClass}>{value ? value.length : 0}</span>/
            {maxLength} {maxLengthDesc}
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
        <div className={classNames(styles.description, descriptionClassName)}>{description}</div>
      )}
      {error && (
        <div
          className={classNames(
            styles.description,
            styles.error,
          )}
        >
          {error.message}
        </div>
      )}
    </div>
  )
}

export {
  Textarea
}