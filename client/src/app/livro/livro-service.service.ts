import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILivro } from './ILivro';

@Injectable({
  providedIn: 'root'
})
export class LivroServiceService {

  url: string = 'http://localhost:3000/livros';

  livros: ILivro[] = [];

  httpHeaders: HttpHeaders;
  
  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders();
    this.httpHeaders.append('Access-Control-Allow-Headers', 'Content-Type');
    this.httpHeaders.append('Access-Control-Allow-Origin', '*');
    this.httpHeaders.append('Content-Type', 'application/json; charset=UTF-8');
   }

  getLivros(): Observable<ILivro[]> {
    return this.http.get<ILivro[]>(this.url, { headers: this.httpHeaders });
  }

  postLivro(livro: ILivro): Observable<ILivro> {
    return this.http.post<ILivro>(this.url, livro, {headers: this.httpHeaders});
  }

  putLivro(livro: ILivro): Observable<ILivro> {
    return this.http.put<ILivro>(`${this.url}/${livro._id}`, livro, {headers: this.httpHeaders})
  }

  deleteLivro(livro_id: string): Observable<ILivro> {
    return this.http.delete<ILivro>(`${this.url}/${livro_id}`, {headers: this.httpHeaders})
  }

}
