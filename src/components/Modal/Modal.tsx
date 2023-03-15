import csx from 'classnames'
import React, { FunctionComponent, ReactNode } from 'react'
import Dialog from 'rc-dialog'
import {IDialogPropTypes} from 'rc-dialog/lib/IDialogPropTypes'
import { GrClose } from 'react-icons/gr'
import {ShadowScroll} from '@/components'
import 'rc-dialog/assets/index.css'
import styles from '@/components/Modal/Modal.module.scss'

export interface ModalProps extends IDialogPropTypes {
  header?: string | ReactNode,
  maxHeight?: string
}

const Modal: FunctionComponent<ModalProps> = ({
  header = '',
  children,
  footer = null,
  onClose = () => {},
  className = '',
  mask = false,
  maxHeight = 'calc(100vh - 6rem)',
  ...rest
}) => {
  if (!rest?.visible) return <></>

  return (
    <Dialog
      style={{
        ...rest?.style,
      }}
      closeIcon={<GrClose/>}
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
        <ShadowScroll className={styles.modalContent} maxHeight={maxHeight}>{children}</ShadowScroll>
      )}
    </Dialog>
  )
}

export { Modal }
