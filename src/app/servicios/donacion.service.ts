import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonacionService {
  private backendUrl = 'http://localhost:8080/donaciones/add';

  constructor(private http: HttpClient) { }

  registrarDonacion(donacionData: any): Observable<any> {
    console.log('Enviando datos al backend:', donacionData);
    return this.http.post(this.backendUrl, donacionData);
  }
}