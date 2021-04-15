import { Observable } from 'rxjs';
import { ComentarioPostagem } from './../model/ComentarioPostagem';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  baseUrl = environment.server + environment.port

  constructor(
  private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllComentarios(): Observable<ComentarioPostagem[]> {
    return this.http.get<ComentarioPostagem[]>(`${this.baseUrl}/comentarios`, this.token)
  }

  getByIdComentario(id: number): Observable<ComentarioPostagem>{
    return this.http.get<ComentarioPostagem>(`${this.baseUrl}/comentarios/${id}`, this.token)
  }

  postComentario(comentario: ComentarioPostagem): Observable<ComentarioPostagem> {
    return this.http.post<ComentarioPostagem>(`${this.baseUrl}/comentarios`, comentario, this.token)
  }

  putComentario(comentario: ComentarioPostagem): Observable<ComentarioPostagem>{
    return this.http.put<ComentarioPostagem>(`${this.baseUrl}/comentarios`, comentario, this.token)
  }

  deleteComentario(id: number){
    return this.http.delete(`${this.baseUrl}/comentarios/${id}`, this.token)
  }
}


