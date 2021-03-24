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

  constructor(
    private http: HttpClient
  ) { }

  entrar(userLogin: UserLogin): Observable<UserLogin>{

    return this.http.post<UserLogin>('http://localhost:8080/usuarios/logar', userLogin);

  }

  cadastrar(usuario: Usuario): Observable<Usuario>{

    return this.http.post<Usuario>('http://localhost:8080/usuarios/cadastrar', usuario);

  }

  // tslint:disable-next-line: typedef
  logado() {

    // tslint:disable-next-line: prefer-const
    let ok = false;

    if (environment.token !== ''){
      ok =  true;
    }

    return ok;

  }
}
