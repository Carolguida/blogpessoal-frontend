import { AuthService } from './../service/auth.service';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  nome = environment.nome
  foto = environment.foto
  id = environment.id


  constructor(
    private router: Router,
    public auth: AuthService
  ) { }

  ngOnInit() {
  }


  sair(){

    this.router.navigate(['/entrar'])
    environment.nome = ''
    environment.token = ''
    environment.foto = ''
    environment.id = 0

  }

}
