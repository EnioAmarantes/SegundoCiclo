import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autor } from './autor';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  url: string = 'http://localhost:3000/autor';

  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders();
    this.httpHeaders.append('Access-Control-Allow-Headers', 'Content-Type');
    this.httpHeaders.append('Access-Control-Allow-Origin', '*');
    this.httpHeaders.append('Content-Type', 'application/json; charset=UTF-8');
  }

  getAutores(): Observable<Autor[]> {
    return this.http.get<Autor[]>(this.url);
  }
  postAutor(autor: Autor): Observable<Autor> {
    return this.http.post<Autor>(this.url, autor, { headers: this.httpHeaders });
  }
  putAutor(autor: Autor): Observable<Autor> {
    return this.http.put<Autor>(`${this.url}/${autor._id}`, autor, { headers: this.httpHeaders });
  }
  deleteAutor(autor_id: string): Observable<Autor> {
    return this.http.delete<Autor>(`${this.url}/${autor_id}`, { headers: this.httpHeaders })
  }

}
