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
        fotoDoPost: 'https://todepassagem.clickbus.com.br/wp-content/uploads/2021/05/Como-tirar-fotos-na-praia-scaled.jpg',
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
          nome: 'Camila',
          avatar: null
        },
        fotoDoPost: 'https://img.freepik.com/fotos-premium/praia-de-areia-de-verao-com-coqueiro-em-um-dia-claro_252965-1012.jpg',
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
    <div className='feedcontainer largura30pctDesktop'>
      {listaDePostagens.map(dadosPostagem=>(
         <Postagem key={...dadosPostagem.id} {...dadosPostagem} /> //o spread operator(...) passa cada propriedade para componente como uma PROP individual 
       ))} 
    </div>
  );
}
