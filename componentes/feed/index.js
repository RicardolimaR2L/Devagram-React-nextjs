import { useEffect, useState } from 'react'
import Postagem from './Postagem'
import FeedService from '@/services/FeedService'

const feedService = new FeedService()

export default function Feed({ usuarioLogado, idUsuario }) {
  const [listaDePostagens, setListaDePostagens] = useState([])
  useEffect(() => {
    const capturarData = async () => {
      const { data } = await feedService.carregarPostagens(idUsuario)
      const postagensFormatadas = data.map(postagem => ({
        id: postagem._id,
        usuario: {
          id: postagem?.idUsuario,
          nome: postagem?.usuario?.nome,
          avatar: postagem?.usuario?.avatar
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
    }
    capturarData()
  }, [usuarioLogado, idUsuario])

  return (
    <div className=" feedContainer  largura30pctDesktop">
      {listaDePostagens.map(dadosPostagem => (
        <Postagem
          key={dadosPostagem.id}
          usuarioLogado={usuarioLogado}
          id={dadosPostagem.id}
          usuario={dadosPostagem.usuario}
          fotoDoPost={dadosPostagem.fotoDoPost}
          descricao={dadosPostagem.descricao}
          comentarios={dadosPostagem.comentarios}
          likes={dadosPostagem.likes}
        /> //o spread operator(...) passa cada propriedade para componente como uma PROP individual
      ))}
    </div>
  )
}
