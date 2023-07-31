import React from 'react'
import csx from 'classnames'
import styles from './ActionLayer.module.scss'
import { Button } from '../Button/Button'
import { AiOutlineClose, AiOutlineRight } from 'react-icons/ai'

interface ActionLayerProps {
  show: boolean
  onBack?: () => void
  onSave?: () => Promise<void>
}

const ActionLayer: React.FC<ActionLayerProps> = ({ show, onBack, onSave }) => {

  const classNames = csx(styles.wrapper, {
    [styles.show]: show
  })

  const back = () => {
    onBack && onBack()
  }

  const save = async () => {
    onSave && await onSave()
  }

  return (
    <div className={classNames}>
        <Button variant='secondary' icon={AiOutlineClose} onClick={back}>Abort & back to list</Button>
        <Button className={styles.redButton} variant='primary' icon={AiOutlineRight} onClick={save}>Save & continue</Button>
        <Button 
          className={styles.redButton} 
          variant='primary' 
          icon={AiOutlineRight} 
          onClick={() => save().then(() => back())}
        >
            Save & back to list
        </Button>
    </div>
  )
}

ActionLayer.displayName = 'ActionLayer'
export { ActionLayer }
