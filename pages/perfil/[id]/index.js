import CabecalhoPerfil from '@/componentes/cabecalhoPerfil'
import Feed from '@/componentes/feed'
import comAutorizacacao from '@/hoc/comAutorizacacao'
import UsuarioService from '@/services/UsuarioService'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const usuarioService = new UsuarioService()

function Perfil(usuarioLogado) {
  const [usuario, setUsuario] = useState({}) //state mockado do titulo que é o nome do usuario
  const router = useRouter()

  const obterPerfil = async idUsuario => {
    try {
      const { data } = await usuarioService.obterPerfil(idUsuario)
      return data
    } catch (error) {
      alert(
        'Erro ao obter o perfil do usuário, esse é o nome do erro:  ' + error
      )
    }
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
      <div className="paginaPerfil">
        <CabecalhoPerfil usuarioLogado={usuarioLogado} usuario={usuario} />
        <Feed
          usuarioLogado={usuarioLogado}
          idUsuario={usuarioService.obterInformacoesDousuarioLogado()?.id}
        />
      </div>
    </>
  )
}

export default comAutorizacacao(Perfil)
