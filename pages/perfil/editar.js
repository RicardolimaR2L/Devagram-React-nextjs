import { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import CabecalhoComAcoes from '@/componentes/cabecalhoComAcoes'
import { UploadImagem } from '@/componentes/uploadImagem'
import comAutorizacao from '@/hoc/comAutorizacao'
import imgAvatarPadrao from '@/public/imagens/avatar.svg'
import imgLimpar from '@/public/imagens/limpar.svg'

function EditarPerfil({ usuarioLogado }) {
  const [avatar, setAvatar] = useState()
  const [nome, setNome] = useState('')
  const [inputAvatar, setInputAvatar] = useState()
  const router = useRouter()

  const aoCancelarEdicao = () => {
    router.push('/perfil/eu')
  }

  const abrirSeletorDeArquivos = () => {
    console.log('abrir seletor de arquivos')
  }

  return (
    <div className="paginaEditarPerfil largura30pxtDesktop ">
      <div className="conteudoPaginaEditarPerfil">
        <CabecalhoComAcoes
          titulo={'Editar perfil'}
          aoClicarAcaoEsquerda={aoCancelarEdicao}
          textoEsquerda={'Cancelar'}
          elementoDireita={'Concluir'}
          aoClicarElementoDireita={() =>
            console.log('Clicou no elemento direita')
          }
        />
      </div>
      <hr className="linhaDivisoria" />

      <div className="edicaoAvatar">
        <UploadImagem
          setImagem={setAvatar}
          imagemPreview={avatar?.preview || imgAvatarPadrao.src}
          aoSetarAReferencia={setInputAvatar}
        />

        <span onClick={abrirSeletorDeArquivos}> Alterar foto do Perfil </span>
        <hr className="linhaDivisoria" />
        <div className="edicaoNome">
          <label>Nome</label>
          <input
            type="text"
            value={nome}
            onchange={e => setNome(e.target.value)}
          />
          <new
            Image
            src={imgLimpar}
            alt="icone Limpar"
            width={16}
            heigth={16}
            onClick={() => setNome('')}
          />
        </div>
      </div>
    </div>
  )
}

export default comAutorizacao(EditarPerfil)
