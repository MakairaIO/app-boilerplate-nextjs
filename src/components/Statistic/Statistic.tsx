import React from 'react'
import styles from '@/components/Statistic/Statistic.module.scss'
import { Text, TextSize } from '../Text/Text'
import csx from 'classnames'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import { Tooltip } from '../Tooltip/Tooltip'

interface StatisticProps {
  value: string
  title: string
  text: string
  tooltip?: string
  type?: 'primary' | 'secondary'
  status?: 'up' | 'down'
  onClick?: () => void
  size?: 'small' | 'medium' | 'large'
}

const Statistic: React.FC<StatisticProps> = ({
  value,
  type = 'primary',
  title,
  text,
  status,
  tooltip,
  onClick,
  size = 'medium'
}) => {

  const valueTextSize: Record<string, TextSize> = {
    small: 'delta',
    medium: 'echo',
    large: 'foxtrot'
  }
  const titleTextSize: Record<string, TextSize>  = {
    small: 'bravo',
    medium: 'charlie',
    large: 'delta'
  }
  const textSize: Record<string, TextSize>  = {
    small: 'alpha',
    medium: 'bravo',
    large: 'charlie'
  }

  return (
    <div
      className={csx(styles.wrapper, styles[type], styles[size])}
      onClick={onClick}
      style={onClick ? { cursor: 'pointer' } : {}}
    >
      <div className={styles.value}>
        <Text element="span" size={valueTextSize[size]} weight="medium">
          {value}
        </Text>
        {status === 'up' && <FaCaretUp className={styles.caretUp} />}
        {status === 'down' && <FaCaretDown className={styles.caretDown} />}
      </div>
      <Text
        className={styles.title}
        element="span"
        size={titleTextSize[size]}
        weight="medium"
      >
        {title}
      </Text>
      {tooltip ? (
        <Tooltip placement="top" overlay={tooltip}>
          <Text
            className={styles.text}
            element="span"
            size={textSize[size]}
            weight="medium"
          >
            {text}
          </Text>
        </Tooltip>
      ) : (
        <Text
          className={styles.text}
          element="span"
          size="bravo"
          weight="medium"
        >
          {text}
        </Text>
      )}
    </div>
  )
}

Statistic.displayName = 'Statistic'
export { Statistic }
