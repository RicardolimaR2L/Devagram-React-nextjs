import HttpService from './HttpService'

export default class FeedService extends HttpService {
  async carregarPostagens(idUsuario) {
    let url = '/feed'
    if (idUsuario) {
      //verifica se temos usuário e passa o id interpolando com a url do feed
      url +=`?id=${idUsuario}` //url dinâmica
    }
    return this.get(url)
  }

  async adicionarComentario(idPostagem, comentario){
     return this.put(`/comentario?id=${idPostagem}`,{
      comentario
     });
  }

}
