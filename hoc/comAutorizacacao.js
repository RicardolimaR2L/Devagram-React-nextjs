import Cabecalho from "@/componentes/layout/Cabecalho";
import UsuarioService from "@/services/UsuarioService"
import { useRouter } from "next/router";

const usuarioService = new UsuarioService();

export default function comAutorizacacao(Componente) {
  return (props) => {
    const router = useRouter;

    if(typeof window !== 'undefined'){ //verifica se ja estamos em um browser
      if(!usuarioService.estaAutenticado()){
        router.replace('/');
        return null; 
      }

      return (
        <>
        < Cabecalho />
        <Componente {...props} />
        </>

      ) 
    }
  }
}
