import { useRef } from 'react'

export function UploadImagem({
  className = '',
  setImagem,
  imagemPreview,
  imagemPreviewClassName = '',
  aoSetarAreferencia
}) {
  const referenciaInput = useRef(null)

  useEffect(() => {
    //executa o escopo do useEfecct toda a vez que alterar a Refencia do Input
    if (!aoSetarAreferencia) {
      return //esse return significa não fazer nada
    }

    aoSetarAreferencia(referenciaInput?.current)
  }, [referenciaInput?.current])

  const abrirSeletorArquivos = () => {
    referenciaInput?.current?.click()
  }

  const aoAlterarImagem = () => {
    //altera aimagem do input

    if (!referenciaInput?.current?.files?.length) {
      //verifica se existe algum arquivo
      return
    }

    const arquivo = referenciaInput?.current?.files[0] //Captura a primeira imagem do array
    const fileReader = new FileReader() //lê e mostra o preview da imagem que pode ser postada
    fileReader.readAsDataURL(arquivo) //lê o arquivo e devolve a URl desse aqruivo pra ser usado em um componente de uploadImagem
    fileReader.onloadend = () => {
      //
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
        accept="image/*"
        ref={referenciaInput}
        onChange={aoAlterarImagem}
      />
    </div>
  )
}
