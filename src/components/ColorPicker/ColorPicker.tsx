import React, { Suspense, useEffect, useRef, useState } from 'react'
import { ColorResult } from '@uiw/react-color'
import styles from '@/components/ColorPicker/ColorPicker.module.scss'
import { Tooltip } from '@/components'

type ColorType = {
  hsla: string;
  rgba: string;
  hex: string
}
type ColorPickerProps = {
  value?: ColorType,
  onChange?: (color: ColorType) => void;
  description?: string;
  lazyLoadingText?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = (props) => {
  const [Sketch, setSketch] = useState<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { 
    onChange = () => {},
    lazyLoadingText = 'Loading...' 
  } = props
  const colorValue = props.value
    ? props.value
    : {
        hex: '#ffffff',
        hsla: 'hsla(0, 0%, 100%, 1)',
        rgba: 'rgba(255, 255, 255, 1)',
      }

  const rgbLabel = ['R', 'G', 'B', 'A']
  const hex = colorValue.hex

  useEffect(() => {
     import('@uiw/react-color').then(module => {
      setSketch(module.Sketch)
    })
  }, [])

  function handleColorChange(color: ColorResult) {
    const { hsla, rgba, hex } = formatColors(color)
    
    onChange({ hsla, rgba, hex })
  }

  function formatColors(color: ColorResult) {
    const { hex } = color
    const { h, s, l, a } = color.hsla
    const { r, g, b } = color.rgb

    return {
      hsla: `hsla(${h}, ${s}%, ${l}%, ${a})`,
      rgba: `rgba(${r}, ${g}, ${b}, ${a})`,
      hex,
    }
  }

  function getRGBA() {
    const { rgba = '' } = colorValue
    return rgba
      ?.substring(5, rgba.length - 1)
      .replace(/ /g, '')
      .split(',')
  }

  const backgroundColor = colorValue.rgba.toString()

  return (
    <div className="color-picker" ref={containerRef}>
      <div className={styles.container}>
        <Tooltip
          placement="topLeft"
          overlay={
            <Suspense
              fallback={
                <div className={styles['color-picker__suspense-loading']}>
                  {lazyLoadingText}
                </div>
              }
            >
              {Sketch && (
                <Sketch
                  color={hex}
                  onChange={handleColorChange}
                  presetColors={[]}
                />
              )}
            </Suspense>
          }
          trigger="click"
          overlayClassName={styles.popover}
        >
          <div className={styles.preview}>
            <div
              className={styles.overlay}
              style={{ backgroundColor: backgroundColor }}
            />
          </div>
        </Tooltip>

        <div className={styles.label}>
          {rgbLabel.map((el, index) => {
            return (
              <div key={index} className={styles.labelValue}>
                <label>{el}</label>
                <span>{getRGBA()[index]}</span>
              </div>
            )
          })}
        </div>
      </div>
      {props.description && (
        <div className={styles.message}>{props.description}</div>
      )}
    </div>
  )
}
export { ColorPicker }
