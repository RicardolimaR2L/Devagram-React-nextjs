import Image from 'next/image'
import avatarImg from '../../public/imagens/avatar.svg'

export default function Avatar({ src }) {
  const getAvatar = () => {
    if (src && src !== 'undefined') {
      console.log('estou dentro do if', src)
      return src
    }
    console.log('estou fora do if')
    return avatarImg.src
  }

  return <img src={getAvatar()} alt="Avatar" className="avatar" />
}
