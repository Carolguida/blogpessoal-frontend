import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  baseUrl = environment.server + environment.port;

  constructor(
    private http: HttpClient
  ) { }

  token = { /* objeto token */
    headers: new HttpHeaders().set('Authorization', environment.token)
  };

  getAllTema(): Observable<Tema[]>{
    return  this.http.get<Tema[]>(`${this.baseUrl}/tema`, this.token);
  }

  postTema(tema: Tema): Observable<Tema>{
    return this.http.post<Tema>(`${this.baseUrl}/tema`, tema, this.token);
  }
}
