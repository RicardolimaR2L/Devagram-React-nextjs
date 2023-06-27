import comAutorizacacao from '@/hoc/comAutorizacacao'
import  Feed  from '../feed';


function Home({usuarioLogado}) {
  return(

    <Feed usuarioLogado={usuarioLogado}/>
  ); 
}

export default comAutorizacacao(Home)
