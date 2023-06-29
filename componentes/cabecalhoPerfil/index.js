import imgSetaEsquerda from '@/public/imagens/setaEsquerda.svg'
import CabecalhoComAcoes from '../cabecalhoComAcoes'
import Avatar from '../avatar'
import Botao from '../botao'

export default function CabecalhoPerfil(usuario) {
  return (
    <div className="cabecalhoPerfil">
      <CabecalhoComAcoes
        iconeEsquerda={imgSetaEsquerda}
        titulo={usuario.nome}
      />
      <div className="statusPerfil">
        <Avatar src={usuario.avatar} />
        <div className="informacoesPerfil">
          <div className="statusContainer">
            <div className="status">
              <strong> 15 </strong>
              <pan>Publicações</pan>
            </div>
            <div className="status">
              <strong> 120</strong>
              <pan>Seguidores</pan>
            </div>
            <div className="status">
              <strong> 1 </strong>
              <pan>Seguindo</pan>
            </div>
          </div>
          <Botao texto={'Seguir'} cor="primaria" />
        </div>
      </div>
    </div>
  )
}
