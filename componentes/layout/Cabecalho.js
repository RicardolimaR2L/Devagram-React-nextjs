import Image from 'next/image'
import { useState } from 'react'
import logoHorizontal from '@/public/imagens/logoHorizontal.svg'
import lupa from '@/public/imagens/lupa.svg'
import Navegacao from './Navegacao'
import ResultadoPesquisa from './ResultadoPesquisa'
import UsuarioService from '@/services/UsuarioService'
import { router, useRouter } from 'next/router'

const usuarioService = new UsuarioService()

export default function Cabecalho() {
  const [resultadoPesquisa, setResultadoPesquisa] = useState([])
  const [termoPesquisado, setTermoPesquisado] = useState('')
  const router = useRouter()

  let cabecalhoClassName = ''
  if (window && window.location.pathname !== '/') {
    cabecalhoClassName = 'desktop'
  }

  const aoPesquisar = async e => {
    setTermoPesquisado(e.target.value)
    setResultadoPesquisa([])
    if (termoPesquisado.length < 3) {
      return
    }

    try {
      const { data } = await usuarioService.pesquisar(termoPesquisado)
      setResultadoPesquisa(data)
    } catch (error) {
      console.log(error)
      alert('Erro ao pesquisar usuário' + error?.response?.data?.erro)
    }
  }

  const aoClicarNoResultadoPesquisa = id => {
    setResultadoPesquisa([])
    setTermoPesquisado('')
    router.push(`/perfil/${id}`)
  }

  const redirecionarParaHome = () => {
    router.push('/')
  }

  return (
    <header className={`cabecalhoPrincipal ${cabecalhoClassName}`}>
      <div className="conteudoCabecalhoPrincipal">
        <div className="logocabecalhoPrincipal">
          <Image
            onClick={() => redirecionarParaHome()} //temos que o usar a arrow function pq o evento de click é um callBack
            src={logoHorizontal}
            alt="logo devagram"
            layout="fill"
          />
        </div>
        <div className="barraPesquisa">
          <div className="containerImagemLupa">
            <Image src={lupa} alt="icone de pesquisa" layout="fill" />
          </div>
          <input
            type="text"
            placeholder="Pesquisar"
            value={termoPesquisado}
            onChange={aoPesquisar}
          />
        </div>
        <Navegacao className="desktop" />
      </div>
      {resultadoPesquisa.length > 0 && (
        <div className="resultadoPesquisaContainer">
          {resultadoPesquisa.map(r => (
            <ResultadoPesquisa
              avatar={r.avatar}
              nome={r.nome}
              email={r.email}
              key={r._id}
              id={r._id}
              onClick={aoClicarNoResultadoPesquisa}
            />
          ))}
        </div>
      )}
    </header>
  )
}
