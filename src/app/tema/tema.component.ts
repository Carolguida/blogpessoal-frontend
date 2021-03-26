import { TemaService } from './../service/tema.service';
import { environment } from './../../environments/environment.prod';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Tema } from '../model/Tema';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema(); /* instanciar tema - ngModel */
  listaTemas: Tema[];

  constructor(
    private router: Router,
    private temaService: TemaService
  ) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    if (environment.token === ''){

      this.router.navigate(['/entrar']);
    }

    this.findAllTemas();
     /* Toda vez que iniciar a pág tema: lista todos os temas */
  }

  // tslint:disable-next-line: typedef
  findAllTemas(){
    // tslint:disable-next-line: deprecation
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp;
    });
  }

  // tslint:disable-next-line: typedef
  cadastrar(){
    // tslint:disable-next-line: deprecation
    this.temaService.postTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp;

      if (this.tema.descricao === null) {
        alert('Por favor, digite um tema.');
      } else {
        alert('Tema cadastrado com sucesso!');
        this.findAllTemas();
        this.tema = new Tema();
      }
    });
  }
}
