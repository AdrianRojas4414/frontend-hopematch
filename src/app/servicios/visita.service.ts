import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitaService {
  private backendUrl = 'https://hopematch-backend.onrender.com/visitas';

  constructor(private http: HttpClient) {}

  registrarVisita(visitaData: any): Observable<any> {
    const payload = {
      fechaVisita: visitaData.fechaVisita,
      horaVisita: visitaData.horaVisita,
      padrinoId: visitaData.padrinoId,
      encargadoId: visitaData.encargadoId
    };
    return this.http.post(`${this.backendUrl}/agendar`, payload);
  }

  getVisitasByPadrino(padrinoId: number): Observable<any> {
    return this.http.get(`${this.backendUrl}/by-padrino/${padrinoId}`);
  }

  getVisitasByEncargado(encargadoId: number): Observable<any> {
    return this.http.get(`${this.backendUrl}/by-encargado/${encargadoId}`);
  }

  actualizarEstadoVisita(visitaId: number, estado: string): Observable<any> {
    return this.http.put(`${this.backendUrl}/${visitaId}/estado`, { estado });
  }

  getMisVisitas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.backendUrl}/mine/padrino`);
  }
}