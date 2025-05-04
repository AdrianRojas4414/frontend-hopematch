import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PadrinoService {
  private backendUrl = "https://hopematch-backend.onrender.com/padrino";

  constructor(private http: HttpClient) { }
  
  getPadrinos(): Observable<any>{
    return this.http.get(`${this.backendUrl}/list`);
  }

  getPadrinoById(id: number): Observable<any>{
    return this.http.get(`${this.backendUrl}/${id}`);
  }

  createPadrino(padrino:any): Observable<any>{
    return this.http.post(`${this.backendUrl}/add`, padrino);
  }

  updatePadrino(id: number, encargado: any): Observable<any> {
    return this.http.put(`${this.backendUrl}/update/${id}`, encargado);
  }
}
