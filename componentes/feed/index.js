import { useEffect, useState } from 'react'
import Postagem from './Postagem'
import FeedService from '@/services/FeedService'


const feedService = new FeedService();

export default function Feed({ usuarioLogado, data }) {
  const [listaDePostagens, setListaDePostagens] = useState([])
  useEffect( () =>  {
    console.log('carregar o feed')

const capturarData= async () =>{
  const {data} =  await feedService.carregarPostagens();
  console.log(data)
}
capturarData();
if(capturarData !== null || capturarData !== 'undefined'){
  return data
}

    setListaDePostagens([ //exemplo mocado de postagem para fazer o teste do feed
      {
        id: '1',
        usuario: {
          id: '1',
          nome: 'Ricardo',
          avatar: ''
        },
        fotoDoPost: 'https://todepassagem.clickbus.com.br/wp-content/uploads/2021/05/Como-tirar-fotos-na-praia-scaled.jpg',
        descricao: 'Lorem Ipsum é simplesmente um texto fictício da indústria tipográfica e de impressão. Lorem Ipsum tem sido o texto fictício padrão da indústria desde os anos 1500, quando um impressor desconhecido pegou uma galera de tipos e os embaralhou para fazer um livros asdasdadas da asdasdasdas sd da dasdasdasdasadasadadadaaa de espécimes de tipos. que texto bacana',
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
          avatar: ''
        },
        fotoDoPost: 'https://img.freepik.com/fotos-premium/praia-de-areia-de-verao-com-coqueiro-em-um-dia-claro_252965-1012.jpg',
        descricao: 'Que praia linda! ',
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
    <div className=' feedContainer  largura30pctDesktop'>
      {listaDePostagens.map(dadosPostagem=>(
         <Postagem
          key={...dadosPostagem.id} 
          {...dadosPostagem} 
          usuarioLogado={usuarioLogado}
          
          /> //o spread operator(...) passa cada propriedade para componente como uma PROP individual 
       ))} 
    </div>
  );
}

