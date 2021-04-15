import { AlertasService } from './../service/alertas.service';
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

  tema: Tema = new Tema() /* instanciar tema - ngModel */
  listaTemas: Tema[]

  constructor(
    private router: Router,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    if (environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    if(environment.tipoUsuario !== 'adm'){
      this.alertas.showAlertInfo('Você precisa ser administrador para acessar essa rota.')
      this.router.navigate(['/inicio'])
    }

    this.findAllTemas()
     /* Toda vez que iniciar a pág tema: lista todos os temas */
  }


  findAllTemas(){
   this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    });
  }


  cadastrar(){

    this.temaService.postTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp

      if (this.tema.descricao == null) {
        this.alertas.showAlertInfo('Por favor, digite um tema.')
      } else {
        this.alertas.showAlertSuccess('Tema cadastrado com sucesso!')
        this.findAllTemas()
        this.tema = new Tema()
      }
    })
  }
}
