import Botao from '@/componentes/botao'
import Avatar from '@/componentes/avatar'
import { UploadImagem } from '@/componentes/uploadImagem'
import { useRef, useState } from 'react'

export default function Home() {
  const [imagem, setImagem] = useState(null)
  const referenciaInput = useRef(null)

  return (
    <>
      <h1> Olá Mundo!</h1>
      <button onClick={() => referenciaInput?.current?.click()}>
        abrir seletor arquivos
      </button>
      /
      <UploadImagem
        setImagem={setImagem}
        imagemPreview={imagem?.preview}
        aoSetarArefeRencia={ref => (referenciaInput.current = ref)}
      />
      <div style={{ width: 200 }}>
        <Avatar />
        <Botao
          texto={'Login'}
          cor="invertido"
          desabilitado={false}
          manipularClique
          {...() => console.log('Botao Clicado')}
        />
      </div>
    </>
  )
}
