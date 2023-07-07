import imgSetaEsquerda from '@/public/imagens/setaEsquerda.svg'
import CabecalhoComAcoes from '../cabecalhoComAcoes'
import Avatar from '../avatar'
import Botao from '../botao'
import { useEffect, useState } from 'react'
import UsuarioService from '@/services/UsuarioService'

const usuarioService = new UsuarioService()

export default function CabecalhoPerfil({ usuario }) {
  const [estaSeguindoOUsuario, setEstaSeguindoOUsuario] = useState(false)
  useEffect(() => {
    const verificarUsuarioSeguido = () => {
      if (!usuario) {
        return null
      }
      setEstaSeguindoOUsuario(usuario.segueEsseUsuario)
    }
    verificarUsuarioSeguido()
  }, [usuario])
    
    const obterTextoBotaoSeguir = () => {
      if (estaSeguindoOUsuario) {
      return 'Deixar de seguir'
    }
    return 'Seguir'
  }

  const obterCorDoBotaoSeguir = () => {
    if (estaSeguindoOUsuario) {
      return 'invertido'
    }
    return 'primaria'
  }

  const manipularCliqueBotaoSeguir = async () => {
    try {
      setEstaSeguindoOUsuario(!estaSeguindoOUsuario)
    await usuarioService.alternarSeguir(usuario?._id)
    } catch (error) {
      //alert(`Erro ao seguir/deixar de seguir!`)
    }
  }

  return (
    <div className="cabecalhoPerfil largura30pctDesktop">
      <CabecalhoComAcoes iconeEsquerda={imgSetaEsquerda} titulo={usuario} />

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
              <strong> {usuario?.seguidores}</strong>
              <span>Seguidores</span>
            </div>

            <div className="status">
              <strong>{usuario?.seguindo}</strong>
              <span>Seguindo</span>
            </div>
          </div>
          <Botao
            texto={obterTextoBotaoSeguir()}
            cor={obterCorDoBotaoSeguir()}
            manipularclique={manipularCliqueBotaoSeguir()}
          />
        </div>
      </div>
    </div>
  )
}
