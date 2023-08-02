import DevagramApiService from './DevagramApiService'

export default class FeedService extends DevagramApiService {
  async carregarPostagens(idUsuario) {
    let url = '/feed'
    if (idUsuario) {
      //verifica se temos usuário e passa o id interpolando com a url do feed
      url += `?id=${idUsuario}` //url dinâmica
    }
    return this.get(url)
  }

  async adicionarComentario(idPostagem, comentario) {
    return this.put(`/comentario?id=${idPostagem}`, {
      comentario
    })
  }

  async alterarcurtida(idPostagem) {
    return this.put(`/like?id=${idPostagem}`)
  }

  async FazerPublicacao(dadosPublicacao) {
    return this.post('/publicacao', dadosPublicacao)
  }
}
