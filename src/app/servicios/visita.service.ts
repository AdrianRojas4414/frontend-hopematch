import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitaService {
  private backendUrl = 'https://hopematch-backend.onrender.com/visitas';

  constructor(private http: HttpClient) {}

  getHorariosDisponibles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.backendUrl}/horarios-disponibles`);
  }

  crearVisita(visitaData: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/agendar`, visitaData);
  }

  getMisVisitas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.backendUrl}/mine/padrino`);
  }
}