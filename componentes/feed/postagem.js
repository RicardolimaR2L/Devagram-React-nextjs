import Image from 'next/image'
import Link from 'next/link'
import Avatar from '../avatar'
import imgCurtir from '../../public/imagens/curtir.svg'
import imgCurtido from '../../public/imagens/curtido.svg'
import imgComentarioAtivo from '../../public/imagens/comentarioAtivo.svg'
import imgComentarioCinza from '../../public/imagens/comentarioCinza.svg'
import { useState } from 'react'
import { FazerComentario } from './FazerComentario'
import FeedService from '@/services/FeedService'

const tamanhoLimiteDescricao = 90
const feedService = new FeedService()

export default function Postagem({
  id,
  usuario,
  fotoDoPost,
  descricao,
  comentarios,
  usuarioLogado,
  likes
}) {
  const [comentariosPostagem, setComentarioPostagem] = useState(comentarios)

  const [deveExibirSecaoParaComentar, setDeveExibirSecaoparaComentar] =
    useState(false)
  const [tamanhoAtualDaDescricao, setTamanhoAtualDaDescricao] = useState(
    tamanhoLimiteDescricao
  )

  const descricaoMaiorQueLimite = () => {
    return descricao.length > tamanhoAtualDaDescricao
  }

  const exibirDescricaoCompleta = () => {
    setTamanhoAtualDaDescricao(Number.MAX_SAFE_INTEGER)
  }

  const obterDescricao = () => {
    let mensagem = descricao.substring(0, tamanhoAtualDaDescricao)
    if (descricaoMaiorQueLimite()) {
      mensagem += '...'
    }
    return mensagem
  }

  const obterImagemComentario = () => {
    return deveExibirSecaoParaComentar ? imgComentarioAtivo : imgComentarioCinza
  }

  const comentar = async (comentario) => {
    try {
      await feedService.adicionarComentario(id, comentario) 
      console.log('fazer comentario')
      setDeveExibirSecaoparaComentar(false)
      setComentarioPostagem([//atualiza o comentario na tela sem ter que fazer uma chamada extra pra api e atualizar a pagina.  
        ...comentariosPostagem,
        {
          nome: usuarioLogado.nome,
          mensagem: comentario
        }
      ])

    } catch (e) {
      console.log('Erro ao fazer comentário' + e?.response?.data?.erro || '')

    }
  }

  return (
    <div className="postagem">
      <Link href={`/perfil/${usuario.id}`}>
        <section className="cabecalhoPostagem">
          <Avatar src={usuario.avatar} />
          <strong>{usuario.nome}</strong>
        </section>
      </Link>

      <div className="fotoDaPostagem">
        <img src={fotoDoPost} alt="Descrição da imagem" />
      </div>

      <div className="rodapeDaPostagem">
        <div className="acoesDaPostagem">
          <Image
            className="span"
            src={imgCurtir}
            alt="icone curtida"
            width={15}
            height={15}
          />
          <Image
            className="span"
            src={obterImagemComentario()}
            alt="icone comentar"
            width={15}
            height={15}
            onClick={() =>
              setDeveExibirSecaoparaComentar(!deveExibirSecaoParaComentar)
            }
          />
          <span className="quantidadeCurtidas span">
            Curtido por <strong>{likes} pessoas</strong>
          </span>
        </div>
        <div className="descricaoDaPostagem">
          <strong className="nomeUsuario">{usuario.nome}</strong>
          <p className="descricao">
            {obterDescricao()}
            {descricaoMaiorQueLimite() && (
              <span
                onClick={exibirDescricaoCompleta}
                className="exibirDescricaoCompleta"
              >
                mais
              </span>
            )}
          </p>
        </div>

        <div className="comentariosDaPublicacao">
          {comentariosPostagem.map((comentario, i) => (
            <div className="comentario" key={i}>
              <strong className="nomeUsuario">{comentario.nome}</strong>
              <p className="descricao">{comentario.mensagem}</p>
            </div>
          ))}
        </div>
      </div>
      {deveExibirSecaoParaComentar && (
        <FazerComentario comentar={comentar} usuarioLogado={usuarioLogado} />
      )}
    </div>
  )
}
