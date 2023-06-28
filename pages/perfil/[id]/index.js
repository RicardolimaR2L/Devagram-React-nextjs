import CabecalhoComAcoes from '../../../componentes/cabecalhoComAcoes'
import Feed from '@/componentes/feed'
import comAutorizacacao from '@/hoc/comAutorizacacao'
import imgSetaEsquerda from '@/public/imagens/setaEsquerda.svg'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function Perfil(usuarioLogado, atualizarOtitulo) {

const [usuario, setUsuario]= useState({}); //state mockado do titulo que é o nome do usuario
const router = useRouter();




useEffect(() => {
  const atualizarOtitulo = async () => {
    setUsuario({
      nome: 'Ricardo Lima'
    });
  };

  atualizarOtitulo(); // Chama a função dentro do useEffect

}, [router.query.id]);//atualiza o nome do usuario de acordo com o id 



  return (
    <>
      <div className="paginaPerfil">
        <CabecalhoComAcoes 
        iconeEsquerda={imgSetaEsquerda}
         titulo={usuario.nome }
         
         />
        <Feed usuarioLogado={usuarioLogado} />
      </div>
    </>
  )
}

export default comAutorizacacao(Perfil)
