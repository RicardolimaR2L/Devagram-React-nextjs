import imgSetaEsquerda from '@/public/imagens/setaEsquerda.svg'
import CabecalhoComAcoes from '../cabecalhoComAcoes'
import Avatar from '../avatar'
import Botao from '../botao'
import { useEffect, useState } from 'react'
import UsuarioService from '@/services/UsuarioService'
import { useRouter } from 'next/router'

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
      setEstaSeguindoOUsuario(usuario.segueEsseUsuario)//o erro pode ser aqui pois eu nao estou acessando o segueEsseUsuario
      setQuantidadeSeguidores(usuario.seguidores)
      console.log(usuario.segueEsseUsuario)//ele ta vindo como undefined
    }
    verificarUsuarioSeguido()
  }, [usuario, estaNoPerfilPessoal ])

  const obterTextoBotaoPrincipal = () => {
    if (estaNoPerfilPessoal) {
        return 'Editar perfil';
    }

    if (estaSeguindoOUsuario) {
        return 'Deixar de seguir';
    }

    return 'Seguir';
}

const obterCorDoBotaoPrincipal = () => {
    if (estaSeguindoOUsuario || estaNoPerfilPessoal) {
      return 'invertido';
    }
    
    return 'primaria';
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

  return (
    <div className="cabecalhoPerfil largura30pctDesktop">
      <CabecalhoComAcoes
        iconeEsquerda={estaNoPerfilPessoal ? null : imgSetaEsquerda}
        aoClicarAcaoEsquerda={aoClicarNaSetaEsquerda}
        titulo={usuario}
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
