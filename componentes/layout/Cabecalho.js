import Image from 'next/image'
import logoHorizontal from '@/public/imagens/logoHorizontal.svg'
import lupa from '@/public/imagens/lupa.svg'
import Navegacao from './Navegacao'


export default function Cabecalho() {
  return (
    <header className="cabecalhoPrincipal">
      <div className="conteudoCabecalhoPrincipal">
        <div className="logocabecalhoPrincipal">
          <Image src={logoHorizontal} alt="logo devagram" layout="fill" />
        </div>
        <div className="barraPesquisa">
          <div className="containerImagemLupa">
            < Image src={lupa} alt="icone de pesquisa" layout="fill" />
          </div>
          <input
            type="text"
            placeholder="Pesquisar"
            value={''}
            onChange={() => console.log('Pesquisando')}
          />
        </div>

        < Navegacao className='desktop' 
        
        />
      </div>
    </header>
  )
}
