import { AlertasService } from './../../service/alertas.service';
import { Tema } from './../../model/Tema';
import { Postagem } from './../../model/Postagem';
import { TemaService } from './../../service/tema.service';
import { PostagemService } from './../../service/postagem.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  postagem: Postagem = new Postagem()
  idPost: number


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private alertas: AlertasService

  ) { }

  ngOnInit() {

    window.scroll(0, 0)

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.idPost = this.route.snapshot.params['id']
    this.findByIdPostagem(this.idPost)


  }
  findByIdPostagem(id: number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
     this.postagem = resp
   })
 }

  apagar(){
    this.postagemService.deletePostagem(this.idPost).subscribe(() => {
      this.alertas.showAlertSuccess('Postagem apagada com sucesso!')
      this.router.navigate(['/inicio'])
    })
 }
}
