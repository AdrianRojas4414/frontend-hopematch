import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {

  private baseURL = 'http://localhost:8080/';
  private secretKey = 'unaClaveSecretaMuySecretaDeAlMenos256BitsEsUnaClaveLargaJAJA';
  constructor(private http: HttpClient) { }

  login(email: string, password: string, userType: string): Observable<any> {
    const body = { email: email, contrasenia: password };
    const loginURL = `${this.baseURL}${userType}/login`
    return this.http.post(loginURL, body, { responseType: 'text' });
  }
}
