import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {

    if (environment.token === ''){
      /* alert('Sua seção expirou. Faça login novamente.'); */
      this.router.navigate(['/entrar']);
    }
  }

}
