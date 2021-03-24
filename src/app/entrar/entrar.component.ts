import { environment } from './../../environments/environment.prod';
import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { UserLogin } from './../model/UserLogin';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin: UserLogin = new UserLogin();

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    window.scroll(0, 0);
  }

  // tslint:disable-next-line: typedef
  entrar() {
    // tslint:disable-next-line: deprecation
    this.auth.entrar(this.userLogin).subscribe((resp: UserLogin) => {
      this.userLogin = resp;

      environment.token = this.userLogin.token;
      environment.nome = this.userLogin.nome;
      environment.id =  this.userLogin.id;
      environment.foto = this.userLogin.foto;

      this.router.navigate(['/inicio']);
    }, erro => {
      if (erro.status === 500){
        alert('Usuario ou senha estão incorretos!')
      }
    } );
  }
}
