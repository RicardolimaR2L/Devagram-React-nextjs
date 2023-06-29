import CabecalhoPerfil from '@/componentes/cabecalhoPerfil'
import Feed from '@/componentes/feed'
import comAutorizacacao from '@/hoc/comAutorizacacao'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function Perfil(usuarioLogado) {
  const [usuario, setUsuario] = useState({}) //state mockado do titulo que é o nome do usuario
  const router = useRouter()

  useEffect(() => {
    const atualizarOtitulo = () => {
      setUsuario({
        nome: 'Ricardo Lima'
      })
    }

    atualizarOtitulo() // Chama a função dentro do useEffect
  }, [router.query.id]) // Adiciona "usuario" como uma dependência

  return (
    <>
      <div className="paginaPerfil">
        <CabecalhoPerfil usuarioLogado={usuarioLogado} usuario={usuario} />
        <Feed usuarioLogado={usuarioLogado} />
      </div>
    </>
  )
}

export default comAutorizacacao(Perfil)
