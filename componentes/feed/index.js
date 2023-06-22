import { useEffect, useState } from 'react'
import Postagem from './postagem'

export default function Feed({ usuarioLogado }) {
  const [listaDePostagens, setListaDePostagens] = useState([])
  useEffect(() => {
    console.log('carregar o feed')
    setListaDePostagens([ //exemplo mocado de postagem para fazer o teste do feed
      {
        id: '1',
        usuario: {
          id: '1',
          nome: 'Ricardo',
          avatar: null
        },
        fotoDoPost: '',
        descricao: '',
        curtidas: [],
        comentarios: [
          {
            nome: 'Fulano',
            mensagem: 'Muito legal'
          }
        ]
      },
      
      {
        id: '2',
        usuario: {
          id: '2',
          nome: 'camila',
          avatar: null
        },
        fotoDoPost: '',
        descricao: '',
        curtidas: [],
        comentarios: [
          {
            nome: 'Fulano',
            mensagem: 'Muito legal'
          }
        ]
      }
    ])
  }, [usuarioLogado])

  return(
    <div className='feedcontainer'>
      {listaDePostagens.map(dadosPostagem=>(
         <Postagem key={...dadosPostagem.id} {...dadosPostagem} /> //o spread operator(...) passa cada propriedade para componente como uma PROP individual 
       ))} 
    </div>
  );
}
