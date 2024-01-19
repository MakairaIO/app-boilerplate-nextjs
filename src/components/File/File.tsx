import { ChangeEvent, MouseEventHandler, useEffect, useId, useState } from 'react'
import csx from 'classnames'
import { FaImages, FaCloudUploadAlt, FaTrash, FaEye } from 'react-icons/fa'

import { useMakairaCloudinary } from '@/makaira/MakairaCloudinaryProvider'
import { CloudinaryImage } from '@/types/Cloudinary'
import { useMakairaConfig } from '@/makaira/MakairaConfigProvider'

import { Menu, MenuItem, SubMenu } from '../Menu/Menu'
import { Spinner } from '../Spinner/Spinner'
import { Button } from '../Button/Button'
import styles from './File.module.scss'
import { Preview } from './Preview'
import { Thumbnail } from './Thumbnail'
import { toast } from '@/utils/toast'
import { useMakairaApp } from '@/makaira/MakairaAppProvider'

type ActionProps = {
  loading?: boolean
  storageType?: string
  onClick: MouseEventHandler<HTMLElement>
  icon: React.ReactNode
  htmlFor?: string
}

function Action(props: ActionProps) {
  const { loading, storageType, icon, onClick, htmlFor } = props

  return (
    <label
      className={csx('file-upload__label', styles.action)}
      onClick={!storageType ? onClick : undefined}
      htmlFor={htmlFor}
    >
      {loading ? (
        <Spinner size="small" />
      ) : (
        <span className={csx('icon', styles.icon)}>{icon}</span>
      )}
    </label>
  )
}

type FileProps = {
  id?: string
  label?: string
  value?: CloudinaryImage | null
  size?: 'normal' | 'small'
  onChange: (value: CloudinaryImage | string | null) => void
  disabled?: boolean
  required?: boolean
  output: 'string' | 'object'
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
    error,
  } = props
  let prepareValue: any = null
  if (typeof value === 'string') {
    prepareValue = {
      url: value,
    }
  } else if (typeof value === 'object') {
    prepareValue = value
  }

  const { showCloudinaryDialog } = useMakairaCloudinary()
  const { getImageLink, storageType } = useMakairaConfig()
  const { client } = useMakairaApp()
  const [file, setFile] = useState<CloudinaryImage | null | undefined>(prepareValue)
  const [showPreview, setShowPreview] = useState(false)
  const randomId = useId()

  useEffect(() => {
    if (typeof value === 'string') {
      setFile({
        url: value,
      } as any)
    } else if (typeof value === 'object') {
      setFile(value)
    }
  }, [value])

  const onSelectImageGallery = () => {
    if (disabled) return

    if (storageType === 'cloudinary') {
      showCloudinaryDialog((images) => {
        setFile(images[0])
        if (output === 'string') {
          const imageStr = getImageLink({ source: images[0] })
          onChange && onChange(imageStr)
        } else {
          onChange && onChange(images[0])
        }
      })
    }
  }

  const onRemoveFile = () => {
    if (disabled) return
    onChange(null)
  }

  const onPreview = () => {
    setShowPreview(!showPreview)
  }

  const onInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target

    try {
      if (storageType === 's3' && files) {
        const data = new FormData()
        data.append('file', files[0])
        const response: any = await client.fetch('upload', { method: 'POST', body: data })
        if (response && response.url) {
          onChange(response)
        }
      }
    } catch (error) {
      toast('Could not upload image.', 'error')
    }
  }

  let addedImage = file && (file.url || file.resourceType === 'image')

  const actions = (
    <div className={csx('file-upload__actions', styles.actions)}>
      {file && Object.keys(file).length > 0 && (
        <>
          <Action onClick={onRemoveFile} icon={<FaTrash />} />
          {addedImage && <Action onClick={onPreview} icon={<FaEye />} />}
        </>
      )}
      <Action
        htmlFor={'file-upload-input-' + randomId}
        loading={false}
        onClick={onSelectImageGallery}
        icon={<FaImages />}
      />
    </div>
  )

  return (
    <div
      id={id}
      className={csx('file-upload', styles.fileUpload, size === 'small' && styles.small)}
    >
      {label && <label className={csx('label', styles.label)}>{label}</label>}
      <div className={csx('file-upload__container', styles.container)}>
        <Thumbnail image={file} />
        <div className={styles.actionsWrapper}>
          <div className={styles.placeholder}></div>
          {size === 'normal' && actions}
          {size === 'small' && (
            <Menu mode="horizontal" className="file-upload__menu-actions">
              <SubMenu
                title={<Button icon={FaCloudUploadAlt} variant="reduced" />}
                key="Settings1"
                popupClassName="submenu__lv1"
              >
                <MenuItem key="Tools/Users1">{actions}</MenuItem>
              </SubMenu>
            </Menu>
          )}
        </div>
        {file && !file.url && (
          <div className={csx('file-upload__detail', styles.fileDetail)}>
            <span>{file.fileName}</span>
            <span>{file.resourceType}</span>
          </div>
        )}
      </div>
      {error && <div className={csx(styles.message, styles.error)}>{error.message}</div>}
      <Preview onClose={setShowPreview} visible={!!addedImage && showPreview} image={file} />
      <input
        className={styles.fileInput}
        id={'file-upload-input-' + randomId}
        required={required}
        type={storageType === 'cloudinary' ? 'hidden' : 'file'}
        onChange={onInputChange}
      />
    </div>
  )
}
