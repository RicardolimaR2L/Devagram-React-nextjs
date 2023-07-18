import CabecalhoPerfil from '@/componentes/cabecalhoPerfil'
import Feed from '@/componentes/feed'
import comAutorizacao from '@/hoc/comAutorizacao'
import UsuarioService from '@/services/UsuarioService'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const usuarioService = new UsuarioService()

function Perfil({ usuarioLogado }) {
  const [usuario, setUsuario] = useState([])
  const router = useRouter()

  const obterPerfil = async idUsuario => {
    try {
      const { data } = await usuarioService.obterPerfil(idUsuario)
      return data
    } catch (error) {
      console.log(error)
      alert('Erro ao obter o perfil do usuário')
    }
  }

  const estaNoPerfilPessoal = () => {
    return router.query.id === 'eu'
  }

  useEffect(() => {
    if (!router.query.id) {
      return
    }

    const usuarioId =
      router.query.id == 'eu'
        ? usuarioService.obterInformacoesDousuarioLogado()?.id
        : router.query.id
    const fetchPerfil = async () => {
      const dadosPerfil = await obterPerfil(usuarioId)
      setUsuario(dadosPerfil)
    }
    fetchPerfil()
  }, [router.query.id])

  return (
    <>
      <div>
        <header className="paginaPerfil">
          <CabecalhoPerfil
            usuarioLogado={usuarioLogado}
            usuario={usuario}
            estaNoPerfilPessoal={estaNoPerfilPessoal()}
          />
          <Feed
            usuarioLogado={usuarioLogado}
            idUsuario={usuario?._id}
            usuarioPerfil={usuario}
          />
        </header>
      </div>
    </>
  )
}

export default comAutorizacao(Perfil)
