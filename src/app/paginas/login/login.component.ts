import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode'
import { UserAuthenticationService } from '../../servicios/user-authentication.service';
import { Router, RouterLink } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { TEXTOS } from '../../config/constants';
import { PadrinoService } from '../../servicios/padrino.service';
import { EncargadoService } from '../../servicios/encargado.service';
import { AdministradorService } from '../../servicios/administrador.service';
import { CommonModule } from '@angular/common';

interface TokenData {
  sub: string;
  id: number;
  UserType: string;
  exp: number;
}

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatRadioModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public texts = TEXTOS;
  email: string = '';
  password: string = '';
  userType: string = 'padrino';
  authUserType: string = '';
  id: number = 0;
  padrino: any = null;
  encargado: any = null;
  estado: string = '';
  mostrarContrasenia: boolean = false;

  constructor(
    private authService: UserAuthenticationService, 
    private router: Router,
    private padrinoService: PadrinoService,
    private encargadoService: EncargadoService
  ) {}

  onLogin() {
    this.authService.login(this.email, this.password, this.userType).subscribe({
      next: () => {
        this.authUserType = this.authService.getUserType();
        this.id = this.authService.getUserId();
        if(this.authService.isUserType('padrino')){
          this.padrinoService.getPadrinoById(+this.id).subscribe({
            next: (data) => {
              this.padrino = data;
              this.estado = this.padrino.estado;

              this.mensajes(this.estado);
              this.router.navigate([`/home-${this.authUserType}`]);
            },
            error: (err) => {
              console.error('Error al obtener datos del padrino:', err);
            }
          });
        }

        if(this.authService.isUserType('encargado')){
          this.encargadoService.getEncargadoById(+this.id).subscribe({
            next: (data) => {
              this.encargado = data;
              this.estado = this.encargado.estado;

              this.mensajes(this.estado);
              this.router.navigate([`/home-${this.authUserType}`]);
            },
            error: (err) => {
              console.error('Error al obtener datos del encargado:', err);
            }
          });
        }

        if(this.authService.isUserType('administrador')){
          this.router.navigate([`/home-${this.authUserType}`]);
        }
      },
      error: (err) => {
        console.error('Error de inicio de sesión: ', err);
        alert(err.error);
      }
    });
  }

  mensajes(estado:any):void{
    if(estado === 'En revision'){
      alert("Su cuenta se encuentra EN REVISIÓN, por favor contáctese con Soporte Técnico.");
    }

    if(estado === 'Suspendido'){
      alert("Su cuenta se encuentra SUSPENDIDA, por favor contáctese con Soporte Técnico.");
    }
  }
  cancelLogin() {
    this.router.navigate(['/inicio']);
  }
}
