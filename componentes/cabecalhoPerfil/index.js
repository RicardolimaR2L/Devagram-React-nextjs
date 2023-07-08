import imgSetaEsquerda from '@/public/imagens/setaEsquerda.svg'
import CabecalhoComAcoes from '../cabecalhoComAcoes'
import Avatar from '../avatar'
import Botao from '../botao'
import { useEffect, useState } from 'react'
import UsuarioService from '@/services/UsuarioService'
import { useRouter } from 'next/router'

const usuarioService = new UsuarioService()
const router = useRouter

export default function CabecalhoPerfil({ usuario }) {
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
      await usuarioService.alternarSeguir(usuario?._id)
      setEstaSeguindoOUsuario(
        !estaSeguindoOUsuario
          ? quantidadeSeguidores - 1
          : quantidadeSeguidores + 1
      )
    } catch (error) {
      //alert(`Erro ao seguir/deixar de seguir!`)
    }
  }
 const aoclicarNaSetaEsquerda = () =>{
 
  router?.back();

 }



  return (
    <div className="cabecalhoPerfil largura30pctDesktop">
      <CabecalhoComAcoes 
      iconeEsquerda={imgSetaEsquerda}
      aoClicarAcaoEsquerda={aoclicarNaSetaEsquerda} 
      titulo={usuario} />

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
            texto={obterTextoBotaoSeguir()}
            cor={obterCorDoBotaoSeguir()}
            manipularclique={manipularCliqueBotaoSeguir()}
          />
        </div>
      </div>
    </div>
  )
}
