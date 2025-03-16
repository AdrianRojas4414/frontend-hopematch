import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {

  private backendURL = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  login(email: string, password: string, userType: string): Observable<any> {
    const body = { email: email, contrasenia: password };
    this.backendURL = 'http://localhost:8080/';
    if (userType == "Padrino"){
      this.backendURL += 'padrino/login'
    }
    if (userType == "Encargado"){
      this.backendURL += 'encargado/login'
    }
    return this.http.post(this.backendURL, body, { responseType: 'text' });
  }
}
