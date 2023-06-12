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
    const fileReader = new FileReader() //lê e mostra o preview da imagem que pode ser postada
    fileReader.readAsDataURL(arquivo) //lê o arquivo e devolve a URl desse arquivo pra ser usado em um componente de uploadImagem
    fileReader.onloadend = () => {
      setImagem({
        preview: fileReader.result,
        arquivo
      })
    }
  }

  return (
    <div
      className={`uploadImagemContainer ${className}`}
      onClick={abrirSeletorArquivos}
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
