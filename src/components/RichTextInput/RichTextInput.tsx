import React, { useEffect, useState, useRef, useMemo, FC, Suspense } from 'react'
import classNames from 'classnames';
import styles from '@/components/RichTextInput/RichTextInput.module.scss'

const DEFAULT_BUTTONS = 'bold,strikethrough,underline,italic,|,ul,ol,brush,paragraph,,image,video,table,link,align,source, fullsize';

type RichTextInputProps = {
  description?: string;
  label?: string;
  value?: string;
  /**
   * Default: en
   */
  language?: string;
  onChange?: (newValue: string) => void,
  tabIndex?: number;
  className?: string;
  /**
   * buttons use for jodit-react
   * Default: bold,strikethrough,underline,italic,|,ul,ol,brush,paragraph,,image,video,table,link,align,source, fullsize
   */
  buttons?: string;
  minHeight?: number;
  readonly?: boolean;
  placeholder?: string;
  toolbarAdaptive?: boolean;
  colorPickerDefaultTab?: 'background' | 'color';
  /**
   * List of plugins that will be initialized in safe mode.
   */
  safePluginsList?: string[];
  /**
   * Text when lazy loading jodit-react lib
   * Default: 
   */
  lazyLoadingText?: string;
}

export const RichTextInput: FC<RichTextInputProps> = (props) => {
  const { 
    value,
    description, 
    label, 
    language = 'en', 
    onChange, 
    tabIndex = 0, 
    className, 
    buttons = DEFAULT_BUTTONS,
    minHeight = 140,
    readonly = false,
    placeholder = '',
    toolbarAdaptive = false,
    colorPickerDefaultTab = 'color',
    safePluginsList = [],
    lazyLoadingText = 'Loading...'
  } = props

  const touched = useRef(false)
  const editor = useRef(null);
  const [JoditEditor, setJoditEditor] = useState<any>(null)

  useEffect(() => {
    const editor = React.lazy(() => import(/* webpackPrefetch: true */'jodit-react'));
    setJoditEditor(editor)
  }, [])

  const editorConfig = useMemo<any>(() => ({
    language,
    placeholder,
    tabIndex,
    readonly,
    minHeight,
    toolbarAdaptive,
    colorPickerDefaultTab,
    safePluginsList,
    toolbarSticky: true,
    buttons,
  }), [language])

  const handleChange = (val: string) => {
    if (!touched.current) return

    if (onChange) {
      onChange(val)
    }
  }

  const onFocus = () => (touched.current = true)

  return (
    <div
      onFocus={onFocus}
      onClick={onFocus}
      className={classNames(styles['rich-text'], className)}
    >
      {label && <div className={styles["rich-text__label"]}>{label}</div>}
      {
        JoditEditor && (
          <Suspense fallback={<div className={styles['rich-text__suspense-loading']}>{lazyLoadingText}</div>}>
            <JoditEditor
              ref={editor}
              onChange={handleChange}
              config={editorConfig}
              value={value}
            />
          </Suspense>
        )
      }
      {description && <div className={styles["rich-text__message"]}>{description}</div>}
    </div>
  )
}