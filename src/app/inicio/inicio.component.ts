import { ComentarioService } from './../service/comentario.service';
import { ComentarioPostagem } from './../model/ComentarioPostagem';
import { AlertasService } from './../service/alertas.service';
import { AuthService } from './../service/auth.service';
import { Usuario } from './../model/Usuario';
import { Tema } from './../model/Tema';
import { TemaService } from './../service/tema.service';
import { PostagemService } from './../service/postagem.service';
import { Postagem } from './../model/Postagem';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]
  tituloPost: string
  temaPost: string

  listaTemas: Tema[]
  idTema: number
  tema: Tema =  new Tema()

  usuario: Usuario = new Usuario()
  idUser = environment.id

  comentarioPostagem: ComentarioPostagem = new ComentarioPostagem()
  listaComentarios: ComentarioPostagem[]
  idComentario: number

  idUserLogado = environment.id
  fotoUserLogado = environment.foto
  nomeUserLogado = environment.nome

  key = "data"
  reverse = true /* da última postagem para o primeiro */

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    public auth: AuthService,
    private alertas: AlertasService,
    private comentarioService: ComentarioService
  ) { }

  ngOnInit() {

    window.scroll(0, 0)

    if (environment.token === ''){

      this.router.navigate(['/entrar']);
    }

    this.getAllTemas()
    this.getAllPostagens()
    this.findAllComentarios()
  }

  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) =>{
      this.listaTemas = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  findByTituloPostagem(){

    if (this.tituloPost == ''){
      this.getAllPostagens()
    } else {
      this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: Postagem[]) => {
        this.listaPostagens = resp
      })
    }

  }

  findByTemaPostagem(){
    if(this.temaPost == ''){
      this.getAllTemas()
    } else {
      this.temaService.getByNomeTema(this.temaPost).subscribe((resp: Tema[])=> {
        this.listaTemas = resp
      })
    }
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  findByIdUser(){
    this.auth.getByIdUser(this.idUser).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.usuario.id = this.idUser
    this.postagem.usuario = this.usuario

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      this.alertas.showAlertSuccess('Postagem realizada com sucesso!')
      this.postagem = new Postagem()
      this.getAllPostagens()
    })
  }

  comentar(id: number){

    this.usuario.id = this.idUserLogado
    this.comentarioPostagem.usuario = this.usuario

    this.postagem.id = id
    this.comentarioPostagem.postagem = this.postagem

    this.comentarioService.postComentario(this.comentarioPostagem).subscribe((resp: ComentarioPostagem) => {
      this.comentarioPostagem = resp
      this.alertas.showAlertSuccess('Comentário feito com sucesso!')
      this.comentarioPostagem = new ComentarioPostagem()
      this.getAllPostagens();
    })


  }

  findAllComentarios(){
    this.comentarioService.getAllComentarios().subscribe((resp: ComentarioPostagem[]) => {
      this.listaComentarios = resp
    })
  }

  deletaComentario(id: number){
    this.comentarioService.deleteComentario(id).subscribe(() =>{
      this.alertas.showAlertSuccess('Comentário deletado com sucesso!')
      this.getAllPostagens()
    })
  }


}
