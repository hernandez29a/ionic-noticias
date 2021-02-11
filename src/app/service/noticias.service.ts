import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { RespuestaTopHedLines } from '../interfaces/interfaces';

import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});



@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headLinesPage = 0;

  categoriaActual = '';
  categoriaPage = 0;

  constructor(private http: HttpClient) { }

  private  ejecutarQuery<T>( query: string) {

    query = apiUrl + query;
    return this.http.get<T>(query, {headers});

  }

  getTopHeadLines() {
    this.headLinesPage ++;
   return this.ejecutarQuery<RespuestaTopHedLines>(`/top-headlines?country=us&page=${this.headLinesPage}`);
    //return this.http.get<RespuestaTopHedLines>(`http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=6915f55781bb4191ab0ce88b8bf83809`);
  }

  getTopHeadLinesCategoria( categoria: string) {

    if( this.categoriaActual === categoria ) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }

    //console.log(categoria);
    //return this.http.get(`http://newsapi.org/v2/top-headlines?country=us&category=${categoria}&apiKey=${apiKey}`);
    return this.ejecutarQuery<RespuestaTopHedLines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`)
  }
}
