import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  nome = environment.nome;
  foto = environment.foto;


  constructor(
    private router: Router
  ) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
  }

  // tslint:disable-next-line: typedef
  sair(){

    this.router.navigate(['/entrar']);
    environment.nome = '';
    environment.token = '';
    environment.foto = '';
    environment.id = 0;

  }

}
