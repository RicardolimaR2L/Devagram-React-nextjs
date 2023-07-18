import Image from 'next/image'

export default function CabecalhoComAcoes({
  className,
  iconeEsquerda,
  textoEsquerda = null,
  aoClicarAcaoEsquerda,
  titulo,
  elementoDireita,
  aoClicarElementoDireita
}) {
  return (
    <div className={`cabecalhoComAcoes  ${className}`}>
      {iconeEsquerda ? (
        <button className="setaEsquerdaDesktop">
          <Image
            src={iconeEsquerda}
            alt="icone esquerda cabeçalho com ações"
            onClick={aoClicarAcaoEsquerda}
            width={25}
            height={25}
          />
        </button>
      ) : (
        textoEsquerda !== null && (
          <span
            className="cabecalhoComAcoesTextoEsquerda"
            onClick={aoClicarAcaoEsquerda}
          >
            {textoEsquerda}
          </span>
        )
      )}

      <h3>{titulo?.nome}</h3>
      {elementoDireita && (
        <button
          type="button"
          className="btnAcaoDireita"
          onClick={aoClicarElementoDireita}
        >
          {elementoDireita}
        </button>
      )}
    </div>
  )
}
