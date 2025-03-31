import { Component } from '@angular/core';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';
import { Router, RouterLink } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, MatRadioModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  userType: string = 'Padrino';

  constructor(private authService: UserAuthenticationService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password, this.userType).subscribe({
      next: (response: string) => {
        const parsedResponse = JSON.parse(response);
        console.log('Response completo:', parsedResponse);
        if(parsedResponse.userType == "Encargado"){
          this.router.navigate([`/perfil-encargado/${parsedResponse.id}`]);
        }
        if(parsedResponse.userType == "Padrino"){
          this.router.navigate([`/perfil-padrino/${parsedResponse.id}`]);
        }
      },
      error: (err) => {
        console.error('Error de inicio de sesión: ', err);
        alert('Usuario o contraseña incorrectos');
      }
    });
  }
}
