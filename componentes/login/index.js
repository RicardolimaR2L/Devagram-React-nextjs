import InputPublico from '../inputPublico'
import envelope from '../../public/imagens/envelope.svg'
import chave from '../../public/imagens/chave.svg'
import logo from '../../public/imagens/logo.svg'
import Image from 'next/image'
import Botao from '../../componentes/botao/index'
import Link from 'next/link'
import { useState } from 'react'
import { validarEmail, validarSenha } from '../../útil/validadores'
import UsuarioService from '@/services/UsuarioService'

const usuarioService = new UsuarioService()

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setsenha] = useState('')
  const [estaSubmetendo, setEstaSubmetendo] = useState(false)

  const validarFormulario = () =>{
    return(
      validarEmail(email)
      && validarSenha || validarSenha && validarEmail(email)
    );
  }

  const aoSubmeter = async(e) =>{
    e.preventDefault();
    if(!validarFormulario()){
      return;
    }
    setEstaSubmetendo(true);

    setEstaSubmetendo(false);

    try {

      await usuarioService.login({
        login:email,
        senha
      });

      //TO DO: redirecionar o usuario para a Home 
      
    } catch (error) {
      alert(
        'Erro ao realizar o login ' + error?.response?.data?.erro
      )
    }

  }

  return (
    <section className={'paginaLogin paginaPublica'}>
      <div className="logoContainer">
        <Image src={logo} alt="Logotipo" layout="fill" className="logo" />
      </div>
      <div className="conteudoPaginaPublica">
        <form onSubmit={aoSubmeter}>
          <InputPublico
            imagem={envelope}
            texto="E-mail"
            tipo="email"
            aoAlterarValor={e => setEmail(e.target.value)}
            valor={email}
            mensagemValidacao="O endereço informado é inválido"
            exibirMensagemValidacao={email && !validarEmail(email)}
          />
          <InputPublico
            imagem={chave}
            texto="Senha"
            tipo="password"
            aoAlterarValor={e => setsenha(e.target.value)}
            valor={senha}
            mensagemValidacao="A senha precisa  pelo menos 6 caracteres"
            exibirMensagemValidacao={senha && !validarSenha(senha)}
          />
          <Botao 
          texto="Login" 
          tipo="submit" 
          desabilitado={!validarFormulario() || estaSubmetendo } />
        </form>
        <div className="rodapePaginaPublica">
          <p>Não possui uma conta?</p>
          <Link href="/cadastro">Faça seu cadastro agora!</Link>
        </div>
      </div>
    </section>
  )
}
