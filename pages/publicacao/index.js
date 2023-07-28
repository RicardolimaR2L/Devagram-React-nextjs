import CabecalhoComAcoes from '@/componentes/cabecalhoComAcoes'
import { UploadImagem } from '@/componentes/uploadImagem'
import comAutorizacao from '@/hoc/comAutorizacao'
import { useState } from 'react'
import imgPublicacao from '@/public/imagens/imgPublicacao.svg'
import imagemSetaEsquerda from '@/public/imagens/setaEsquerda.svg'
import Botao from '@/componentes/botao'

function publicacao() {
  const [imagem, setImagem] = useState()
  const [descricao, setDescricao] = useState('')
  const [inputImagem, setInputImagem] = useState()
  const [etapaAtual, setEtapaAtual] = useState(1)

  const estaNaEtapaUm = () => etapaAtual === 1 //aqui usamos a sintaxe reduzida sem as {} pois queremos que retorne o resultado direto que é a etapa1.

  const obterTextoEsquerdaCabecalho = () => {
    if (estaNaEtapaUm() && imagem) {
      return 'Cancelar'
    }
    return ''
  }

  const obterTextoDireitaCabecalho = () => {
    if (!imagem) {
      return ''
    }

    if (estaNaEtapaUm() && imagem) {
      return 'Avançar'
    }
    return 'Compartilhar'
  }

  const aoClicarAcaoEsquerdaCabecalho = () => {
    if (estaNaEtapaUm()) {
      inputImagem.value = null
      setImagem(null)
      return
    }
    setEtapaAtual(1)
  }

  const aoClicarAcaoDireitaCabecalho = () => {
    setEtapaAtual(2)
  }

  return (
    <div className="paginaPublicacao largura30pctDesktop">
      <h1>Nova publicação</h1>
      <CabecalhoComAcoes
        iconeEsquerda={estaNaEtapaUm() ? null : imagemSetaEsquerda}
        textoEsquerda={obterTextoEsquerdaCabecalho()}
        aoClicarAcaoEsquerda={aoClicarAcaoEsquerdaCabecalho}
        elementoDireita={obterTextoDireitaCabecalho()}
        aoClicarElementoDireita={aoClicarAcaoDireitaCabecalho}
      />
      <hr className="linhaDivisoria" />
      <div className="conteudoPaginaPublicacao">
        {estaNaEtapaUm() ? (
          <div className="primeiraEtapa">
            <UploadImagem
              setImagem={setImagem}
              aoSetarAReferencia={setInputImagem}
              imagemPreviewClassName={
                !imagem ? 'previewImagemPublicacao' : 'previewImagemSelecionada'
              }
              imagemPreview={imagem?.preview || imgPublicacao.src}
            />
            <span className="desktop textoDragAndDrop">
              Arraste sua foto aqui.{' '}
            </span>

            <Botao
              texto={'Selecionar uma imagem'}
              manipularClique={() => inputImagem?.click()}
            />
          </div>
        ) : (
          <>
         
          <div className="segundaEtapa">
            <UploadImagem
              setImagem={setImagem}
              imagemPreview={imagem?.preview}
            />

            <textarea
              rows={3}
              value={descricao}
              placeholder="Escreva uma legenda"
              onChange={e => setDescricao(e.target.value)}
            ></textarea>
          </div>
            <hr className="linhaDivisoria" />
        </>
        )}
      </div>
    </div>
  )
}

export default comAutorizacao(publicacao)
