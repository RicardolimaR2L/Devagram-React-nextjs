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
        fotoDoPost: 'https://a4.espncdn.com/combiner/i?img=%2Fi%2Fespn%2Fmisc_logos%2F500%2Fnba.png',
        descricao: 'Lorem Ipsum é simplesmente um texto fictício da indústria tipográfica e de impressão. Lorem Ipsum tem sido o texto fictício padrão da indústria desde os anos 1500, quando um impressor desconhecido pegou uma galera de tipos e os embaralhou para fazer um livro de espécimes de tipos.',
        curtidas: [],
        comentarios: [
          {
            nome: 'Fulano',
            mensagem: 'Muito legal'
          }
          ,
          {
            nome: 'Fulano de tal',
            mensagem: 'Muito legal'
          },
          {
            nome: 'Fulano da esquina',
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
        fotoDoPost: 'https://a4.espncdn.com/combiner/i?img=%2Fi%2Fespn%2Fmisc_logos%2F500%2Fnba.png',
        descricao: 'Lorem Ipsum é simplesmente um texto fictício da indústria tipográfica e de impressão. Lorem Ipsum tem sido o texto fictício padrão da indústria desde os anos 1500, quando um impressor desconhecido pegou uma galera de tipos e os embaralhou para fazer um livro de espécimes de tipos.',
        curtidas: [],
        comentarios: [
          {
            nome: 'Fulano',
            mensagem: 'Muito legal'
          },
          {
            nome: 'Fulano de tal',
            mensagem: 'Muito legal'
          },
          {
            nome: 'Fulano da esquina',
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
