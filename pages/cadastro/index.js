import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Botao from '@/componentes/botao'
import InputPublico from '@/componentes/inputPublico'
import { UploadImagem } from '@/componentes/uploadImagem'
import UsuarioService from '@/services/UsuarioService'
import { useRouter } from 'next/router'

import logo from '../../public/imagens/logo.svg'
import usuarioAtivo from '../../public/imagens/usuarioAtivo.svg'
import avatar from '../../public/imagens/avatar.svg'
import envelope from '../../public/imagens/envelope.svg'
import chave from '../../public/imagens/chave.svg'

import {
  validarEmail,
  validarSenha,
  validarNome,
  validarConfirmacaoSenha
} from '../../útil/validadores'

const usuarioService = new UsuarioService()

export default function Cadastro() {
  const [imagem, setImagem] = useState(null)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirtmacaosenha, setConfirmacaosenha] = useState('')
  const [estaSubmetendo, setEstaSubmetendo] = useState(false)
  const router = useRouter()

  const validarFormulario = () => {
    return (
      validarNome(nome) &&
      validarEmail(email) &&
      validarSenha(senha) &&
      validarConfirmacaoSenha(senha, confirtmacaosenha)
    )
  }

  const aoSubmeter = async e => {
    e.preventDefault()

    if (!validarFormulario()) {
      return
    }

    setEstaSubmetendo(true)

    try {
      const corpoReqCadastro = new FormData()
      corpoReqCadastro.append('nome', nome)
      corpoReqCadastro.append('email', email)
      corpoReqCadastro.append('senha', senha)
      if (imagem?.arquivo) {
        corpoReqCadastro.append('file', imagem.arquivo)
      }

      await usuarioService.cadastro(corpoReqCadastro)
      await usuarioService.login({
        login: email,
        senha
      })
      router.push('/')
    } catch (error) {
      console.log(error)
      alert('Erro ao cadastrar usuário' + erro?.response?.data?.erro)
    }
    setEstaSubmetendo(false)
  }

  return (
    <section className={'paginaCadastro paginaPublica'}>
      <div className="logoContainer desktop">
        <Image src={logo} alt="Logotipo" layout="fill" className="logo" />
      </div>
      <div className="conteudoPaginaPublica">
        <form onSubmit={aoSubmeter}>
          <UploadImagem
            imagemPreviewClassName="avatar avatarPreview"
            imagemPreview={imagem?.preview || avatar.src}
            setImagem={setImagem}
          />

          <InputPublico
            imagem={usuarioAtivo}
            texto="Nome Completo"
            tipo="text"
            aoAlterarValor={e => setNome(e.target.value)}
            valor={nome}
            mensagemValidacao="O nome precisa pelo menos de 2 caracteres"
            exibirMensagemValidacao={nome && !validarNome(nome)}
          />

          <InputPublico
            imagem={envelope}
            texto="E-mail"
            tipo="email"
            aoAlterarValor={e => setEmail(e.target.value)}
            valor={email}
            mensagemValidacao="O e-mail informado é inválido "
            exibirMensagemValidacao={email && !validarEmail(email)}
          />
          <InputPublico
            imagem={chave}
            texto="Senha"
            tipo="password"
            aoAlterarValor={e => setSenha(e.target.value)}
            valor={senha}
            mensagemValidacao="A senha precisa  pelo menos 3 caracteres"
            exibirMensagemValidacao={senha && !validarSenha(senha)}
          />
          <InputPublico
            imagem={chave}
            texto="Confirmar Senha"
            tipo="password"
            aoAlterarValor={e => setConfirmacaosenha(e.target.value)}
            valor={confirtmacaosenha}
            mensagemValidacao="A senha precisam ser iguais"
            exibirMensagemValidacao={
              confirtmacaosenha &&
              !validarConfirmacaoSenha(senha, confirtmacaosenha)
            }
          />
          <Botao
            texto="Cadastrar"
            tipo="submit"
            desabilitado={!validarFormulario() || estaSubmetendo}
          />
        </form>
        <div className="rodapePaginaPublica">
          <p>Já possui uma conta?</p>
          <Link href="/login">Faça seu login agora!</Link>
        </div>
      </div>
    </section>
  )
}
