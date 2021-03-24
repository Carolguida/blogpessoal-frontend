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

  // tslint:disable-next-line: new-parens
  usuario: Usuario = new Usuario;
  confirmarSenha: string;
  tipoUser: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {

    window.scroll(0, 0);

  }

  // tslint:disable-next-line: typedef
  confirme(event: any){
    this.confirmarSenha = event.target.value;
  }
// tslint:disable-next-line: typedef
  tipoUsuario(event: any){
    this.tipoUser = event.target.value;
  }
// tslint:disable-next-line: typedef
  cadastrar(){
    this.usuario.tipoUsuario = this.tipoUser;

    if (this.usuario.senha !== this.confirmarSenha){
      alert('As senhas estão incorretas!');
    }else {
      // tslint:disable-next-line: deprecation
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp;
        this.router.navigate(['/entrar']);
        alert('Usuário cadastrado com sucesso!');

      });
    }
  }
}
