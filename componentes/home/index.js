import comAutorizacacao from '@/hoc/comAutorizacacao'
import  Feed  from '../feed';


function Home({usuarioLogado}) {
  return(

    <Feed UsuarioLogado={usuarioLogado}/>
  ); 
}

export default comAutorizacacao(Home)
