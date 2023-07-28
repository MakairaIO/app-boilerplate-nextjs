import { CloudinaryImage } from "@/types/Cloudinary";
import { Modal } from "../Modal/Modal";
import Image from "../Image/Image";

interface PreviewProps {
  onClose: (state: boolean) => void
  visible: boolean
  image?: CloudinaryImage | null
}

export function Preview(props: PreviewProps) {
  const { onClose, visible, image } = props

  if (!image) return null

  return (
    <Modal
      onClose={() => onClose(false)}
      visible={visible}
      header={"Preview"}
      maxHeight="90vh"
      mask={true}
    >
      {!image.url && <Image image={{ src: image || null, alt: '' }} />}
      {image.url && <Image image={{ src: image.url as any, alt: '' }} />}
    </Modal>
  )
}