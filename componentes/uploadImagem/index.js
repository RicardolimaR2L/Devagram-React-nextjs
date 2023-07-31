import { useRef, useEffect } from 'react'

export function UploadImagem({
  className = '',
  setImagem,
  imagemPreview,
  imagemPreviewClassName = '',
  aoSetarAReferencia
}) {
  const referenciaInput = useRef(null)

  useEffect(() => {
    if (!aoSetarAReferencia) {
      return
    }
    aoSetarAReferencia(referenciaInput?.current)
  }, [referenciaInput.current])

  const abrirSeletorArquivos = () => {
    referenciaInput?.current?.click()
  }

  const aoAlterarImagem = () => {
    if (!referenciaInput?.current?.files?.length) {
      //verifica se existe algum arquivo
      return
    }

    const arquivo = referenciaInput?.current?.files[0] //Captura a primeira imagem do array  
    obterUrlDaImagemEAtualizarEstado(arquivo)  

  }

  const obterUrlDaImagemEAtualizarEstado = (arquivo) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(arquivo)
    fileReader.onloadend = () => {
      setImagem({
        preview: fileReader.result,
        arquivo
      })
    }
  }

  const aoSoltarAimagem = e => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const arquivo = e.dataTransfer.files[0]
      obterUrlDaImagemEAtualizarEstado(arquivo)  

    }
  }

  return (
    <div
      className={`uploadImagemContainer ${className}`}
      onClick={abrirSeletorArquivos}
      onDragOver={e => e.preventDefault()}
      onDrop={aoSoltarAimagem}
    >
      {imagemPreview && (
        <div className="imagemPreviewContainer">
          <img
            src={imagemPreview}
            alt="imagem preview"
            className={imagemPreviewClassName}
          />
        </div>
      )}
      <input
        type="file"
        className="oculto"
        accept="Image/*"
        ref={referenciaInput}
        onChange={aoAlterarImagem}
      />
    </div>
  )
}
