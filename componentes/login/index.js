import InputPublico from '../inputPublico'
import envelope from '../../public/images/envelope.svg'
import chave from '../../public/images/chave.svg'
import logo from '../../public/images/logo.svg'
import Image from 'next/image'
import Botao from '../../componentes/botao/index'
import Link from 'next/link'
import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setsenha] = useState('')

  return (
    <section className={'paginaLogin paginaPublica'}>
      <div className="logoContainer">
        <Image src={logo} alt="Logotipo" layout="fill" />
      </div>
      <div className="conteudoPaginaPublica">
        <form>
          <InputPublico
            imagem={envelope}
            texto="E-mail"
            tipo="email"
            aoAlterarValor={e => setEmail(e.target.value)}
            valor={email}
          />
          <InputPublico
            imagem={chave}
            texto="Senha"
            tipo="password"
            aoAlterarValor={e => setsenha(e.target.value)}
            valor={senha}
          />
          <Botao texto="Login" tipo="submit" desabilitado={false} />
        </form>
        <div className="rodapePaginaPublica">
          <p>Não possui uma conta?</p>
          <p>
            <Link href="/cadastro">Faça seu cadastro agora!</Link>
          </p>
        </div>
      </div>
    </section>
  )
}
