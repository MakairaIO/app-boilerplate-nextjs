import csx from 'classnames'
import React, { FunctionComponent, ReactNode } from 'react'
import Dialog from 'rc-dialog'
import {IDialogPropTypes} from 'rc-dialog/lib/IDialogPropTypes'
import { FaTimes } from 'react-icons/fa'
import {ShadowScroll} from '@/components'

import 'rc-dialog/assets/index.css'
import styles from '@/components/Modal/Modal.module.scss'


export interface ModalProps extends IDialogPropTypes {
  header?: string | ReactNode,
}

const Modal: FunctionComponent<ModalProps> = ({
  header = '',
  children,
  footer = null,
  onClose = () => {},
  className = '',
  mask = false,
  ...rest
}) => {
  if (!rest?.visible) return <></>

  return (
    <Dialog
      style={{...rest?.style}}
      closeIcon={<FaTimes/>}
      className = {
        csx(`${styles.modal} ${className}`)
      }
      title={header}
      onClose={onClose}
      mask={mask}
      animation="fade"
      maskAnimation="fade"
      footer={footer && <div className={styles.modalFooter}>{footer}</div>}
      destroyOnClose
      wrapClassName={`${styles.wrapper}`}
      {...rest}
    >
      {children && (
        // <div className={styles.modalContent}>{children}</div>
        <ShadowScroll className={styles.modalContent}>{children}</ShadowScroll>
      )}
    </Dialog>
  )
}

export { Modal }
