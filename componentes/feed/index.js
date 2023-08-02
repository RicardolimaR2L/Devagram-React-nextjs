import { useEffect, useState } from 'react'
import FeedService from '@/services/FeedService'
import Postagem from '@/componentes/feed/Postagem'

const feedService = new FeedService()

export default function Feed({ usuarioLogado, usuarioPerfil, idUsuario }) {
  const [listaDePostagens, setListaDePostagens] = useState([])

  useEffect(() => {
    const capturarData = async () => {
      setListaDePostagens([])
      const { data } = await feedService.carregarPostagens(idUsuario)
      if (data.length > 0) {
        const postagensFormatadas = data.map(postagem => ({
          id: postagem._id,
          usuario: {
            id: postagem?.idUsuario || usuarioPerfil?._id,
            nome: postagem?.usuario?.nome || usuarioPerfil?.nome,
            avatar: postagem?.usuario?.avatar || usuarioPerfil?.avatar
          },
          fotoDoPost: postagem?.foto,
          descricao: postagem?.descricao,
          likes: postagem?.likes,
          comentarios: postagem?.comentarios?.map(c => ({
            nome: c.nome,
            mensagem: c.comentario
          }))
        }))
        setListaDePostagens(postagensFormatadas)
      } else {
        setListaDePostagens([])
      }
    }
    capturarData()
  }, [usuarioLogado, idUsuario])

  if (!listaDePostagens.length) {
    return null
  }

  return (
    <div className=" feedContainer  largura30pctDesktop">
      {listaDePostagens?.map(dadosPostagem => (
        <Postagem
          key={dadosPostagem.id}
          usuarioLogado={usuarioLogado}
          id={dadosPostagem.id}
          usuario={dadosPostagem?.usuario}
          fotoDoPost={dadosPostagem.fotoDoPost}
          descricao={dadosPostagem.descricao}
          comentarios={dadosPostagem.comentarios}
          likes={dadosPostagem.likes}
        />
      ))}
    </div>
  )
}
