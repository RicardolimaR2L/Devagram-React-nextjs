import Link from 'next/link'
import Avatar from '../avatar'
import Image from 'next/image'

import imgCurtir from '@/public/imagens/curtir.svg'
import imgCurtido from '@/public/imagens/curtido.svg'
import imgComentarioAtivo from '@/public/imagens/comentarioAtivo.svg'
import imgComentarioCinza from '@/public/imagens/comentarioCinza.svg'

export default function Postagem({
  usuario,
  fotoDoPost,
  descricao,
  curtidas,
  comentarios
}) {
  console.log(usuario)

  return (
    <div className="feedContainer">
      <div className="postagem">
        <Link href={`/perfil/${usuario.id}`}>
          <section className="cabecalhoPostagem">
            <Avatar src={usuario.avatar} />
            <strong>{usuario.nome}</strong>
          </section>
        </Link>

        <div className="fotoDaPostagem">
          <img src={fotoDoPost} alt="foto da postagem" />
        </div>
        <div className="rodapeDaPostagem">
          <div className="acoesDaPostagem">
            <Image
              src={imgCurtir}
              alt="icone  curtir"
              width={20}
              height={20}
              onClick={() => console.log('Curtir')}
            />
            <Image
              src={imgComentarioCinza}
              alt="icone comentar"
              width={20}
              height={20}
              onClick={() => console.log('Comentar')}
            />

            <span className="quantidadeDeCurtidas">
              curtido por <strong> 32 pessoas</strong>
            </span>
          </div>
          <div className="descricaoDapostagem">
            <strong className="nomeUsuario">{usuario.nome}</strong>
            <p className="descricao">{descricao}</p>
          </div>
          <div className="comentariosDaPostagem">
            {comentarios.map((comentario, i) => (
              <div className="comentario" key={i}>
                <strong className="nomeUsuario">{comentario.nome}</strong>
                <p className="descricao">{comentario.mensagem}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
