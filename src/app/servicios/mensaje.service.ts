import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mensaje } from '../models/mensaje';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  private backendUrl = "https://hopematch-backend.onrender.com/mensajes";

  constructor(private http: HttpClient) {}

  enviarMensaje(mensaje: Mensaje): Observable<Mensaje> {
    return this.http.post<Mensaje>(`${this.backendUrl}/add`, mensaje);
  }

  obtenerMensajesPorRemitente(idRemitente: number): Observable<Mensaje[]> {
    return this.http.get<Mensaje[]>(`${this.backendUrl}/por-remitente/${idRemitente}`);
  }

  obtenerMensajesPorDestinatario(idDestinatario: number): Observable<Mensaje[]> {
    return this.http.get<Mensaje[]>(`${this.backendUrl}/por-destinatario-id/${idDestinatario}`);
  }

  marcarLeido(id: number): Observable<Mensaje> {
    return this.http.put<Mensaje>(`${this.backendUrl}/marcar-leido/${id}`, {});
  }

}
