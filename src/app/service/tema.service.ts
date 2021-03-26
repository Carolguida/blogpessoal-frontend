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

  putTema(tema: Tema): Observable<Tema> {
    return this.http.put<Tema>(`${this.baseUrl}/tema`, tema, this.token);
  }

  /* Necessário apenas do id para delete tema */
  deleteTema(id: number) {
    return this.http.delete(`${this.baseUrl}/tema/${id}`, this.token);
  }

  /* Traz um objeto tema através do id */
  getByIdTema(id: number): Observable<Tema> {
    return this.http.get<Tema>(`${this.baseUrl}/tema/${id}`, this.token);
  }

}
