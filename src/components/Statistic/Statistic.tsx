import React from 'react'
import styles from '@/components/Statistic/Statistic.module.scss'
import { Text } from '../Text/Text'
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
}

const Statistic: React.FC<StatisticProps> = ({
  value,
  type = 'primary',
  title,
  text,
  status,
  tooltip,
  onClick,
}) => {
  return (
    <div
      className={csx(styles.wrapper, styles[type])}
      onClick={onClick}
      style={onClick ? { cursor: 'pointer' } : {}}
    >
      <div className={styles.value}>
        <Text element="span" size="echo" weight="medium">
          {value}
        </Text>
        {status === 'up' && <FaCaretUp className={styles.caretUp} />}
        {status === 'down' && <FaCaretDown className={styles.caretDown} />}
      </div>
      <Text
        className={styles.title}
        element="span"
        size="charlie"
        weight="medium"
      >
        {title}
      </Text>
      {tooltip ? (
        <Tooltip placement="top" overlay={tooltip}>
          <Text
            className={styles.text}
            element="span"
            size="bravo"
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
