import Avatar from '../avatar'
import { useState } from 'react'

export function FazerComentario({ usuarioLogado, comentar }) {
  const [linhas, setLinhas] = useState(1)
  const [comentario, setComentario] = useState('')

  const aoDigitarComentario = e => { //verificar o tamnaho da mensagem e aumenta as linhas se precisar
    const valorInput = e.target.value;
    setComentario(valorInput)
    setLinhas(valorInput.length > 0 ? 2 : 1)
  }

  const aoPressionarQualquerTecla = e => {//verifica se a tecla enter foi pressionada e executa o manipular comentario 
    if (e.key === 'Enter') {
      fazerComentario()
    }
  }

  const fazerComentario = () => {
    if (comentario.trim().length === 0 || !comentar) {//verifica o tamanho do comentario é maior  que zero e tamebm se o comentario existe 
      
    }
    comentar(comentario) //retorna o comentário feito após  as verificações  
   
  }

  return (
    <div className="containerFazerComentario">
      <Avatar src={usuarioLogado?.avatar} />
      <textarea
        rows={linhas}
        onChange={aoDigitarComentario}
        onKeyDown={aoPressionarQualquerTecla}
        value={comentario}
        placeholder="Adicione um comentário..."
      ></textarea>
      <button
       type="button"
       onClick={fazerComentario}
       className="btnPublicacao desktop">
        Publicar
      </button>
    </div>
  )
}
