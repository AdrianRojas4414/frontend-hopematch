  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class EncargadoService {

    private backendUrl = "http://localhost:8080/encargado";
    
    constructor(private http: HttpClient) { }

    getEncargados(): Observable<any>{
      return this.http.get(`${this.backendUrl}/list`);
    }

    getEncargadoById(id: number): Observable<any>{
      return this.http.get(`${this.backendUrl}/${id}`);
    }

    createEncargado(padrino:any): Observable<any>{
      return this.http.post(`${this.backendUrl}/add`, padrino);
    }

    createNino(idEncargado: number, nino: any): Observable<any> {
      return this.http.post(`${this.backendUrl}/${idEncargado}/add-nino`, nino);
    }

  }
