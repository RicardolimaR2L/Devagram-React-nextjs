import Cabecalho from '@/componentes/layout/Cabecalho'
import UsuarioService from '@/services/UsuarioService'
import { useRouter } from 'next/router'
import Rodape from '@/componentes/layout/Rodape'

const usuarioService = new UsuarioService()

export default function comAutorizacacao(Componente) {
  return props => {
    const router = useRouter

    if (typeof window !== 'undefined') {
      //verifica se ja estamos em um browser
      if (!usuarioService.estaAutenticado()) {
        router.replace('/')
        return null
      }

      const UsuarioLogado = usuarioService.obterInformacoesDousuarioLogado();

      return (
        <>
          <Cabecalho UsuarioLogado={UsuarioLogado} />
          <Componente UsuarioLogado={UsuarioLogado} {...props} />
          <Rodape UsuarioLogado={UsuarioLogado} />
        </>
      )
    }
  }
}
