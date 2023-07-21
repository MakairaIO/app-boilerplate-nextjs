import { MouseEventHandler, useEffect, useState } from "react"
import csx from "classnames"
import { FaImages, FaCloudUploadAlt, FaTrash, FaEye } from 'react-icons/fa'

import { useMakairaCloudinary } from "@/makaira/MakairaCloudinaryProvider"
import { CloudinaryImage } from "@/types/Cloudinary"
import { useMakairaConfig } from "@/makaira/MakairaConfigProvider"

import { Menu, MenuItem, SubMenu } from "../Menu/Menu"
import { Spinner } from "../Spinner/Spinner"
import { Button } from "../Button/Button"
import { Modal } from "../Modal/Modal"
import Image from "../Image/Image"
import styles from './File.module.scss'

type ActionProps = {
  loading?: boolean
  storageType?: string
  onClick: MouseEventHandler<HTMLElement>
  icon: React.ReactNode
}

function Action(props: ActionProps) {
  const {
    loading,
    storageType,
    icon,
    onClick
  } = props

  return (
    <label
      className={csx('file-upload__label', styles.action)}
      onClick={!storageType ? onClick : undefined}
    >
      {loading ? <Spinner size="small" /> : <span className={csx("icon", styles.icon)}>{icon}</span>}
    </label>
  )
}


type FileProps = {
  id?: string
  label?: string;
  value?: CloudinaryImage | null
  size?: 'normal' | 'small'
  onChange: (value: CloudinaryImage | string | null) => void
  disabled?: boolean
  required?: boolean
  output: 'string' | 'object',
  error?: {
    message: string
  }
}

export function File(props: FileProps) {
  const {
    id,
    label,
    value,
    size = 'normal',
    onChange,
    disabled,
    required,
    output = 'object',
    error
  } = props
  let prepareValue: any = null
  if (typeof value === 'string') {
    prepareValue = {
      url: value
    }
  } else if (typeof value === 'object') {
    prepareValue = value
  }

  const { showCloudinaryDialog } = useMakairaCloudinary()
  const { getImageLink } = useMakairaConfig()
  const [file, setFile] = useState<CloudinaryImage | null | undefined>(prepareValue)
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    if (typeof value === 'string') {
      setFile({
        url: value
      } as any)
    } else if (typeof value === 'object') {
      setFile(value)
    }
  }, [value])

  const onSelectImageGallery = () => {
    if (disabled) return
    showCloudinaryDialog((images) => {
      setFile(images[0])
      if (output === 'string') {
        const imageStr = getImageLink({source: images[0]})
        onChange && onChange(imageStr)
      } else {
        onChange && onChange(images[0])
      }
    })
  }

  const onRemoveFile = () => {
    if (disabled) return
    onChange(null)
  }

  const onPreview = () => {
    setShowPreview(!showPreview)
  }

  let addedImage = file && (file.url || file.resourceType === 'image')

  const actions = (
    <div className={csx("file-upload__actions", styles.actions)}>
      {
        file && Object.keys(file).length > 0 && (
          <>
            <Action onClick={onRemoveFile} icon={<FaTrash />} />
            { addedImage && <Action onClick={onPreview} icon={<FaEye />} />}
          </>
        )
      }
      <Action loading={false} onClick={onSelectImageGallery} icon={<FaImages />} />
    </div>
  )

  return (
    <div id={id} className={csx('file-upload', styles.fileUpload, size === 'small' && styles.small)}>
      {label && <label className={csx('label', styles.label)}>{label}</label>}
      <div className={csx("file-upload__container", styles.container)}>
        {
          size === 'normal' && actions
        }
        {
          size === 'small' && (
            <Menu mode="horizontal" className="file-upload__menu-actions">
              <SubMenu
                title={<Button icon={FaCloudUploadAlt} variant="reduced" />}
                key="Settings1"
                popupClassName="submenu__lv1"
              >
                <MenuItem key="Tools/Users1">
                  {actions}
                </MenuItem>
              </SubMenu>
            </Menu>
          )
        }
        {
          file && !file.url && (
            <div className={csx('file-upload__detail', styles.fileDetail)}>
              <span>{file.fileName}</span>
              <span>{file.resourceType}</span>
            </div>
          )
        }
      </div>
      {error && (
        <div
          className={csx(styles.message, styles.error)}
        >
          {error.message}
        </div>
      )}
      <Modal
        onClose={() => setShowPreview(false)}
        visible={showPreview}
        header={"Preview"}
        maxHeight="90vh"
        mask={true}
      >
        {addedImage && !file?.url && <Image image={{ src: file || null, alt: '' }} />}
        {addedImage && file?.url && <Image image={{ src: file.url as any, alt: '' }} />}
      </Modal>
      <input value={value as any} required={required} type="hidden" onChange={() => {}}/>
    </div>
  )
}