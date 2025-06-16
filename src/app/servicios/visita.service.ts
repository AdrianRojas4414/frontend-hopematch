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

  getAllVisitasForEncargado(encargadoId: number): Observable<any[]> { 
    console.log('VisitaService: ID de Encargado recibido como parámetro:', encargadoId);

    const requestUrl = `${this.backendUrl}/by-encargado/${encargadoId}`;
    console.log('VisitaService: URL final de la petición al backend:', requestUrl); 

    return this.http.get<any[]>(requestUrl);
  }

  acceptVisita(visitaId: number): Observable<any> {
    return this.http.put(`${this.backendUrl}/${visitaId}/estado`, { estado: 'ACEPTADA' });
  }

  denyVisita(visitaId: number): Observable<any> {
    return this.http.put(`${this.backendUrl}/${visitaId}/estado`, { estado: 'RECHAZADA' });
  }
}

