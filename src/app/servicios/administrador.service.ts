import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  private backendUrl = "https://hopematch-backend.onrender.com/administrador";

  constructor(private http: HttpClient) { }
  
  getAdministradores(): Observable<any> {
    return this.http.get(`${this.backendUrl}/list`);
  }

  getAdministradorById(id: number): Observable<any> {
    return this.http.get(`${this.backendUrl}/${id}`);
  }

  createAdministrador(administrador: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/add`, administrador);
  }

  updateAdministrador(id: number, administrador: any): Observable<any> {
    return this.http.put(`${this.backendUrl}/update/${id}`, administrador);
  }
}