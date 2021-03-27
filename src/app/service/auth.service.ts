import { environment } from './../../environments/environment.prod';
import { Usuario } from './../model/Usuario';
import { UserLogin } from './../model/UserLogin';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  baseUrl = environment.server + environment.port;

  constructor(
    private http: HttpClient
  ) { }

  entrar(userLogin: UserLogin): Observable<UserLogin>{

    return this.http.post<UserLogin>(`${this.baseUrl}/usuarios/logar`, userLogin);

  }

  cadastrar(usuario: Usuario): Observable<Usuario>{

    return this.http.post<Usuario>(`${this.baseUrl}/usuarios/cadastrar`, usuario);

  }

  getByIdUser(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.baseUrl}/usuarios/${id}`)
  }

  // tslint:disable-next-line: typedef
  logado() { /* mostra menu e rodapé se logado */

    // tslint:disable-next-line: prefer-const
    let ok = false;

    if (environment.token !== ''){
      ok =  true;
    }

    return ok;

  }
}
