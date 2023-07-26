import CabecalhoComAcoes from '@/componentes/cabecalhoComAcoes'
import { UploadImagem } from '@/componentes/uploadImagem'
import comAutorizacao from '@/hoc/comAutorizacao'
import { useState } from 'react'
import imgPublicacao from '@/public/imagens/imgPublicacao.svg'
import Botao from '@/componentes/botao'

function publicacao() {
  const [imagem, setImagem] = useState()
  const [inputImagem, setInputImagem] = useState()

  return (
    <div className="paginaPublicacao largura30pctDesktop">
      <h1>Nova publicação</h1>
      <CabecalhoComAcoes
        textoEsquerda={''}
        elementoDireita={''}
      />
      <hr className="linhaDivisoria" />
      <div className="conteudoPaginaPublicacao">
        <div className="primeiraEtapa">
          <UploadImagem
            setImagem={setImagem}
            aoSetarAReferencia={setInputImagem}
            imagemPreviewClassName={'previewImagemPublicacao'}
            imagemPreview={imagem?.preview || imgPublicacao.src}
          />
          <span className="desktop textoDragAndDrop">
            Arraste sua foto aqui.{' '}
          </span>

          <Botao
            texto={'Selecionar uma imagem'}
            manipularClique={() => console.log('teste ok ')}
          />
        </div>
      </div>
    </div>
  )
}

export default comAutorizacao(publicacao)
