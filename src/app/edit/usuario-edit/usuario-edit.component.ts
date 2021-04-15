import { AlertasService } from './../../service/alertas.service';
import { AuthService } from './../../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from './../../model/Usuario';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuario: Usuario = new Usuario()
  idUser: number
  tipoUsuario: string

  confirmarSenha: string

  constructor(
    private router: Router,
    public auth: AuthService,
    private route: ActivatedRoute,
    private alertas: AlertasService
  ) { }

  ngOnInit() {

    window.scroll(0, 0)

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)
  }

  confirme(event: any){
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any){
    this.tipoUsuario = event.target.value
  }

  findByIdUser(id: number){
    this.auth.getByIdUser(id).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  atualizar(){

    this.usuario.tipoUsuario = this.tipoUsuario

    if (this.usuario.senha !== this.confirmarSenha){
      this.alertas.showAlertDanger('As senhas estão incorretas!')
    }else {

        this.auth.atualizar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.router.navigate(['/inicio'])
        this.alertas.showAlertSuccess('Usuario atualizado com sucesso! Faça login novamente')

        environment.token= ''
        environment.nome = ''
        environment.foto= ''
        environment.id = 0

        this.router.navigate(['/entrar'])

      })
    }
  }
}
