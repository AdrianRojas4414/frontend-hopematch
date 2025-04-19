import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NinoService {

  private backendUrl = "http://localhost:8080/nino";

  constructor(private http: HttpClient) { }


  getNinoByCi(ci: number): Observable<any>{
    return this.http.get(`${this.backendUrl}/ci/${ci}`);
  }

  getNinoById(id: number): Observable<any> {
    return this.http.get(`${this.backendUrl}/${id}`);
  }

  updateNino(id: number, nino: any): Observable<any> {
    return this.http.put(`${this.backendUrl}/update/${id}`, nino);
  }

  getNecesidadesByEncargado(idEncargado: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.backendUrl}/necesidades/${idEncargado}`);
  }
  deleteNino(id: number): Observable<void> {
    return this.http.delete<void>(`${this.backendUrl}/delete/${id}`);
  }
}
