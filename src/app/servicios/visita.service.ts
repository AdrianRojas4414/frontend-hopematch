import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitaService {
  private backendUrl = 'https://hopematch-backend.onrender.com/visitas';

  constructor(private http: HttpClient) {}

  crearVisita(visitaData: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/agendar`, visitaData);
  }

  getMisVisitas(): Observable<any[]> {
    const padrinoId = Number(localStorage.getItem('userId'));
    return this.http.get<any[]>(`${this.backendUrl}/by-padrino/${padrinoId}`);
  }

  getAllVisitasForEncargado(): Observable<any[]> {
    const encargadoId = Number(localStorage.getItem('userId'));
    return this.http.get<any[]>(`${this.backendUrl}/by-encargado/${encargadoId}`);
  }

  acceptVisita(visitaId: number): Observable<any> {
    return this.http.put(`${this.backendUrl}/${visitaId}/estado`, { estado: 'ACEPTADA' });
  }

  denyVisita(visitaId: number): Observable<any> {
    return this.http.put(`${this.backendUrl}/${visitaId}/estado`, { estado: 'RECHAZADA' });
  }
}

