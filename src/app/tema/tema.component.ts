import { environment } from './../../environments/environment.prod';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    if (environment.token === ''){

      this.router.navigate(['/entrar']);
    }
  }

}
