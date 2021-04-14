import { AlertasService } from './../service/alertas.service';
import { AuthService } from './../service/auth.service';
import { Usuario } from './../model/Usuario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {


  usuario: Usuario = new Usuario;
  tipoUser: string;

  confirmarSenha: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }


  ngOnInit() {

    window.scroll(0, 0)

  }

  confirme(event: any){
    this.confirmarSenha = event.target.value
  }

  tipoUsuario(event: any){
    this.tipoUser = event.target.value
  }

  cadastrar(){
    this.usuario.tipoUsuario = this.tipoUser

    if (this.usuario.senha !== this.confirmarSenha){
      this.alertas.showAlertDanger('As senhas estão incorretas!')
    }else {

      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.router.navigate(['/entrar'])
        this.alertas.showAlertSuccess('Usuário cadastrado com sucesso!')

      })
    }
  }
}
