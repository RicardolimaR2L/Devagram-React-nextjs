import Image from 'next/image'

import homeAtivo from '@/public/imagens/homeAtivo.svg'
import homeCinza from '@/public/imagens/homeCinza.svg'
import publicacaoAtiva from '@/public/imagens/publicacaoAtiva.svg'
import publicacaoCinza from '@/public/imagens/publicacaoCinza.svg'
import usuarioAtivo from '@/public/imagens/usuarioAtivo.svg'
import usuarioCinza from '@/public/imagens/usuarioCinza.svg'

export default function Navegacao({ className }) {
  return (
    <nav className={`barraNavegacao ${className}`}>
      <ul>
        <li>
          <Image src={homeAtivo} alt="icone home" width={20} height={20} />
        </li>
        <li>
          <Image
            src={publicacaoCinza}
            alt="icone publicacao"
            width={20}
            height={20}
          />
        </li>
        <li>
          <Image
            src={usuarioCinza}
            alt="icone de usuario"
            width={20}
            height={20}
          />
        </li>
      </ul>
    </nav>
  )
}
