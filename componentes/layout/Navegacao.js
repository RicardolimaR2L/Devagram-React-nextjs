import Image from 'next/image'
import homeAtivo from '@/public/imagens/homeAtivo.svg'
import homeCinza from '@/public/imagens/homeCinza.svg'
import publicacaoAtiva from '@/public/imagens/publicacaoAtiva.svg'
import publicacaoCinza from '@/public/imagens/publicacaoCinza.svg'
import usuarioAtivo from '@/public/imagens/usuarioAtivo.svg'
import usuarioCinza from '@/public/imagens/usuarioCinza.svg'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const mapaDeRotas = {
  home: {
    imagemAtivo: homeAtivo,
    rotasAtivacao: ['/'],
    imagemPadrao: homeCinza
  },
  publicacao: {
    imagemAtivo: publicacaoAtiva,
    rotasAtivacao: ['/publicacao'],
    imagemPadrao: publicacaoCinza
  },
  perfil: {
    imagemAtivo: usuarioAtivo,
    rotasAtivacao: ['/perfil/eu', '/perfil/eu/editar'],
    imagemPadrao: usuarioCinza
  }
}
export default function Navegacao({ className }) {
  const [rotaAtiva, setRotaAtiva] = useState('home')
  const router = useRouter()

  useEffect(() => {
    definirRotaAtiva()
  }, [router.asPath])

  const definirRotaAtiva = () => {
    const chaveDoMapaDeRotas = Object.keys(mapaDeRotas)
    const indiceAtivo = chaveDoMapaDeRotas.findIndex(chave => {
      return mapaDeRotas[chave].rotasAtivacao.includes(window.location.pathname)
    })
    if (indiceAtivo === -1) {
      setRotaAtiva('home')
    } else {
      setRotaAtiva(chaveDoMapaDeRotas[indiceAtivo])
    }
  }

  const obterImagem = nomeRota => {
    const rotaAtivada = mapaDeRotas[nomeRota]

    if (rotaAtiva === nomeRota) {
      return rotaAtivada.imagemAtivo
    }

    return rotaAtivada.imagemPadrao
  }

  const aoClicarNoIcone = nomeRota => {
    setRotaAtiva(nomeRota)
    router.push(mapaDeRotas[nomeRota].rotasAtivacao[0])
  }

  return (
    <nav className={`barraNavegacao ${className}`}>
      <ul>
        <li onClick={() => aoClicarNoIcone('home')}>
          <Image
            src={obterImagem('home')}
            alt="icone home"
            width={20}
            height={20}
          />
        </li>
        <li onClick={() => aoClicarNoIcone('publicacao')}>
          <Image
            src={obterImagem('publicacao')}
            alt="icone publicacao"
            width={20}
            height={20}
          />
        </li>
        <li onClick={() => aoClicarNoIcone('perfil')}>
          <Image
            src={obterImagem('perfil')}
            alt="icone de usuario"
            width={20}
            height={20}
          />
        </li>
      </ul>
    </nav>
  )
}
