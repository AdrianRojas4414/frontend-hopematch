import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode'
import { UserAuthenticationService } from '../../servicios/user-authentication.service';
import { Router, RouterLink } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { TEXTOS } from '../../config/constants';

interface TokenData {
  sub: string;
  id: number;
  UserType: string;
  exp: number;
}

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, MatRadioModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public texts = TEXTOS;
  email: string = '';
  password: string = '';
  userType: string = 'padrino';

  constructor(private authService: UserAuthenticationService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password, this.userType).subscribe({
      next: () => {
        const userType = this.authService.getUserType();
        this.router.navigate([`/home-${userType}`])
      },
      error: (err) => {
        console.error('Error de inicio de sesión: ', err);
        alert(err.error);
      }
    });
  }
}
