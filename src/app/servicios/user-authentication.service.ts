import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

export interface TokenData {
  sub: string;
  id: number;
  UserType: string;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {

  private baseURL = 'http://localhost:8080/';
  private tokenKey = 'token';
  constructor(private http: HttpClient) { }

  login(email: string, password: string, userType: string): Observable<any> {
    const body = { email: email, contrasenia: password };
    const loginURL = `${this.baseURL}${userType}/login`
    return this.http.post(loginURL, body, { responseType: 'text' });
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  decodeToken(): TokenData | null {
    const token = this.getToken();
    if(!token) return null;
    try{
      return jwtDecode<TokenData>(token);
    } catch(error){
      console.error('Token invalido: ', error);
      return null;
    }
  }

  getUserId(): number {
    return this.decodeToken()?.id ?? 0;
  }

  getUserType(): string {
    return this.decodeToken()?.UserType ?? '';
  }

  isUserType(type: string): boolean {
    return this.getUserId() !== 0 && this.getUserType().toLowerCase() === type.toLowerCase();
  }

}
