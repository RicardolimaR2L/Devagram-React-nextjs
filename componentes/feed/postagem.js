import Link from 'next/link'
import Avatar from '../avatar'

export default function Postagem({
  
  usuario

}) {
console.log(usuario)


  return (
    <div className="postagem">
      <Link href={`/perfil/${usuario.id}`}>
        <section className="cabecalhopostagem">
          <Avatar src={usuario.avatar} />
          <strong>{usuario.nome} </strong>
        </section>
      </Link>
    </div>
  )
}
