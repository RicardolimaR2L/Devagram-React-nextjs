import Cabecalho from '@/componentes/layout/Cabecalho'
import UsuarioService from '@/services/UsuarioService'
import { useRouter } from 'next/router'
import Rodape from '@/componentes/layout/Rodape'

const usuarioService = new UsuarioService()

export default function comAutorizacacao(Componente) {
  return (props) => {
    const router = useRouter

    if (typeof window !== 'undefined') {
      //verifica se ja estamos em um browser
      if (!usuarioService.estaAutenticado()) {
        router.replace('/')
        return null
      }

      const usuarioLogado = usuarioService.obterInformacoesDousuarioLogado();

      return (
        <>
          <Cabecalho usuarioLogado={usuarioLogado} />
          <Componente usuarioLogado={usuarioLogado} {...props} />
          <Rodape usuarioLogado={usuarioLogado} />
        </>
      
      )
    }
    return null;
  }


}
