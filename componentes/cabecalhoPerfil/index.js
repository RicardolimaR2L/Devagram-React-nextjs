import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import imgSetaEsquerda from '@/public/imagens/setaEsquerda.svg'
import imgLogout from '@/public/imagens/logout.svg'
import CabecalhoComAcoes from '../cabecalhoComAcoes'
import Avatar from '../avatar'
import Botao from '../botao'
import UsuarioService from '@/services/UsuarioService'

const usuarioService = new UsuarioService()

export default function CabecalhoPerfil({ usuario, estaNoPerfilPessoal }) {
  const router = useRouter()
  const [estaSeguindoOUsuario, setEstaSeguindoOUsuario] = useState(false)
  const [quantidadeSeguidores, setQuantidadeSeguidores] = useState(0)

  useEffect(() => {
    const verificarUsuarioSeguido = () => {
      if (!usuario) {
        return null
      }
      setEstaSeguindoOUsuario(usuario.segueEsseUsuario)
      setQuantidadeSeguidores(usuario.seguidores)
    }
    verificarUsuarioSeguido()
  }, [usuario, estaNoPerfilPessoal])

  const obterTextoBotaoPrincipal = () => {
    if (estaNoPerfilPessoal) {
      return 'Editar perfil'
    }

    if (estaSeguindoOUsuario == true) {
      return 'Deixar de seguir'
    }

    return 'Seguir'
  }

  const obterCorDoBotaoPrincipal = () => {
    if (estaSeguindoOUsuario == true || estaNoPerfilPessoal) {
      return 'invertido'
    }

    return 'primaria'
  }
  const manipularCliqueBotaoPrincipal = async () => {
    if (estaNoPerfilPessoal) {
      router.push('/perfil/editar')
    }
    try {
      await usuarioService.alternarSeguir(usuario?._id)
      setQuantidadeSeguidores(
        estaSeguindoOUsuario
          ? quantidadeSeguidores - 1
          : quantidadeSeguidores + 1
      )
      setEstaSeguindoOUsuario(!estaSeguindoOUsuario)
    } catch (error) {
      console.log(error)
      alert('Erro ao Seguir/Deixar de seguir')
    }
  }

  const aoClicarNaSetaEsquerda = () => {
    router.back()
  }

  const logout = () => {
    usuarioService.logout()
    router.push('/')
  }

  const obterElementoDireitaCabecalho = () => {
    if (estaNoPerfilPessoal) {
      return (
        <Image
          src={imgLogout}
          alt="icone logout"
          onClick={logout}
          width={23}
          height={23}
        />
      )
    }

    return null
  }

  return (
    <div className="cabecalhoPerfil largura30pctDesktop">
      <CabecalhoComAcoes
        iconeEsquerda={estaNoPerfilPessoal ? null : imgSetaEsquerda}
        aoClicarAcaoEsquerda={aoClicarNaSetaEsquerda}
        titulo={usuario}
        elementoDireita={obterElementoDireitaCabecalho()}
      />

      <hr className="bordaDoCabecalhoPerfil" />

      <div className="statusPerfil">
        <Avatar src={usuario?.avatar} />
        <div className="informacoesPerfil">
          <div className="statusContainer">
            <div className="status">
              <strong>{usuario?.publicacoes} </strong>
              <span>Publicações</span>
            </div>

            <div className="status">
              <strong> {quantidadeSeguidores}</strong>
              <span>Seguidores</span>
            </div>

            <div className="status">
              <strong>{usuario?.seguindo}</strong>
              <span>Seguindo</span>
            </div>
          </div>
          <Botao
            texto={obterTextoBotaoPrincipal()}
            cor={obterCorDoBotaoPrincipal()}
            manipularClique={manipularCliqueBotaoPrincipal}
          />
        </div>
      </div>
    </div>
  )
}
