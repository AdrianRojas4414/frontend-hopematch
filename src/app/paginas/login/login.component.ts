import { Component } from '@angular/core';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  userType: string = 'Padrino';

  constructor(private authService: UserAuthenticationService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Inicio de sesión exitoso');
        alert('Inicio de sesion exitoso');
      },
      error: (err) => {
        console.error('Error de inicio de sesión: ', err);
        alert('Usuario o contraseña incorrectos');
      }
    });
  }
}
