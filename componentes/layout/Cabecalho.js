import Image from 'next/image'
import { useState } from 'react'
import logoHorizontal from '@/public/imagens/logoHorizontal.svg'
import lupa from '@/public/imagens/lupa.svg'
import Navegacao from './Navegacao'
import ResultadoPesquisa from './ResultadoPesquisa'


export default function Cabecalho() {
  const [resultadoPesquisa, setResultadoPesquisa] = useState([])
  const [termoPesquisado, setTermoPesquisado] = useState([])

  const aoPesquisar = e => {
    setTermoPesquisado(e.target.value)
    setResultadoPesquisa([])
    if (termoPesquisado.length < 3) {
      return
    }

    setResultadoPesquisa([
      {
        avatar: 'https://noticiasdebasquete.com.br/wp-content/uploads/2023/04/NBA-1-e1682039031830.jpg' ,
        nome:'RICARDO',
        email:'ricardo@teste.com',
        id:'300693'
      },
      {
        avatar: '',
        nome: 'CAMILA',
        email: 'camila@teste.com',
        id:'250694'
      },
      {
        avatar: '',
        nome: 'HELENA',
        email: 'helena@teste.com',
        id:'131213'
      }
    ])
  }

  const aoClicarNoResultadoPesquisa = id => {
    console.log('aoClicarNoResultadoPesquisa', { id })
  }

  return (
    <header className="cabecalhoPrincipal">
      <div className="conteudoCabecalhoPrincipal">
        <div className="logocabecalhoPrincipal">
          <Image src={logoHorizontal} alt="logo devagram" layout="fill" />
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
              id={r.id}
              onClick={aoClicarNoResultadoPesquisa}
            />
          ))}
        </div>
      )}
    </header>
  )
}
