import Image from 'next/image'


export default function CabecalhoComAcoes({
  className,
  iconeEsquerda,
  textoEsquerda = null,
  aoclicaAcaoEsquerda,
  titulo
}) {
  return (
    <div className={`cabecalhoComAcoes${className}`}>
      {iconeEsquerda ? (
        <Image
          src={iconeEsquerda}
          alt="icone esquerda cabeçalho com ações"
          onClick={aoclicaAcaoEsquerda}
          width={20}
          height={20}
        />
      ) : (
        textoEsquerda !== null && (
          <span
            className="cabecalhoComAcoesTextoEsquerda"
            onClick={aoclicaAcaoEsquerda}
          >
            {textoEsquerda}
          </span>
        )
      )}
 
    <h3>{titulo}</h3>
    
    
    </div>
  )
}
