import Gravatar from 'react-gravatar'

interface MakairaGravatarProps {
  email: string
}

const MakairaGravatar: React.FC<MakairaGravatarProps> = ({ email, ...rest }) => {
  let DEFAULT_URL = 'blank'
  if(email) {
    const name = email
      .replace(/[^a-zA-Z]+/g, '')
      .substring(0, 2)
      .toLowerCase()

    DEFAULT_URL =  'https://cdn.auth0.com/avatars/' + name + '.png'
  }
  
  return (
    <Gravatar
      default={DEFAULT_URL as any}
      email={email}
      protocol="https://"
      size={32}
      {...rest}
    />
  )
}

MakairaGravatar.displayName = 'MakairaGravatar'

export { MakairaGravatar }
