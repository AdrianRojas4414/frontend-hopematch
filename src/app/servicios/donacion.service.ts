import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DonacionService {
  private backendUrl = 'https://hopematch-backend.onrender.com/donaciones';

  constructor(private http: HttpClient) { }

  registrarDonacion(donacionData: any): Observable<any> {
    console.log('Enviando datos al backend:', donacionData);
    return this.http.post(`${this.backendUrl}/add`, donacionData);
  }

  getDonacionesByPadrino(padrinoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.backendUrl}/by-padrino/${padrinoId}`).pipe(
      map(donaciones => donaciones.sort((a, b) => 
        new Date(b.fechaDonacion).getTime() - new Date(a.fechaDonacion).getTime()
      ))
    );
  }

  getDonacionById(id: number): Observable<any> {
    return this.http.get(`${this.backendUrl}/${id}`);
  }

  getDonacionesByEncargado(encargadoId: number): Observable<any> {
    return this.http.get(`${this.backendUrl}/by-encargado/${encargadoId}`);
  }

  agregarComentarioEncargado(donacionId: number, comentario: string): Observable<any> {
    return this.http.post(`${this.backendUrl}/${donacionId}/comentario`, { comentario });
  }

  actualizarFotoDonacion(donacionId: number, fotoUrl: string): Observable<any> {
    const body = { fotoUrl: fotoUrl }; 
    return this.http.put(`${this.backendUrl}/${donacionId}/foto`, body);
  }

  agregarFotosProgreso(donacionId: number, fotos: string[]): Observable<any> {
    return this.http.put(`${this.backendUrl}/${donacionId}/fotos-progreso`, { fotos });
  }
  
  actualizarFotosProgreso(donacionId: number, fotos: string[]): Observable<any> {
    return this.http.put(`${this.backendUrl}/${donacionId}/fotos-progreso`, { fotos });
  }
}