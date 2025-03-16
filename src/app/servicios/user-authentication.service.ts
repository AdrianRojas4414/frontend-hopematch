import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {

  private backendURL = 'http://localhost:8080/padrino/login';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const body = { email: email, contrasenia: password };
    return this.http.post(this.backendURL, body, { responseType: 'text' });
  }
}
