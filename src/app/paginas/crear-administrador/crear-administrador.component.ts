import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdministradorService } from '../../servicios/administrador.service';
import { TEXTOS } from '../../config/constants';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-administrador',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-administrador.component.html',
  styleUrls: ['./crear-administrador.component.scss']
})
export class CrearAdministradorComponent {
  public texts = TEXTOS;
  administrador = {
    nombre: '',
    email: '',
    contrasenia: ''
  };
  mostrarContrasenia: boolean = false;

  constructor(
    private administradorService: AdministradorService, 
    private router: Router, 
    private authService: UserAuthenticationService
  ) {}

  private validarCampoRequerido(valor: string, campo: string): boolean {
    if (!valor.trim()) {
      alert(`El campo ${campo} es obligatorio`);
      return false;
    }
    return true;
  }

  private validarLongitudMinima(valor: string, campo: string, longitud: number): boolean {
    if (valor.trim().length < longitud) {
      alert(`El campo ${campo} debe tener al menos ${longitud} caracteres`);
      return false;
    }
    return true;
  }

  private validarEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert('Ingrese un email válido (ejemplo: usuario@dominio.com)');
      return false;
    }
    return true;
  }

  private validarContrasenia(contrasenia: string): boolean {
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(contrasenia)) {
      alert('La contraseña debe contener al menos:\n- Una letra mayúscula\n- Una letra minúscula\n- Un número\n- Un carácter especial (@$!%*?&)');
      return false;
    }
    return true;
  }

  private async verificarEmailUnico(email: string): Promise<boolean> {
    try {
      const administradores = await this.administradorService.getAdministradores().toPromise();
      const existe = administradores.some((admin: any) => admin.email === email);
      if (existe) {
        alert('Este email ya está registrado. Por favor use otro.');
      }
      return !existe;
    } catch {
      return true;
    }
  }
    
  cancelarRegistro(): void {
    this.router.navigate(['/inicio']);
  }

  private validarFormulario(): boolean {
    return this.validarCampoRequerido(this.administrador.nombre, 'nombre') &&
           this.validarLongitudMinima(this.administrador.nombre, 'nombre', 3) &&
           this.validarCampoRequerido(this.administrador.email, 'email') &&
           this.validarEmail(this.administrador.email) &&
           this.validarCampoRequerido(this.administrador.contrasenia, 'contraseña') &&
           this.validarLongitudMinima(this.administrador.contrasenia, 'contraseña', 8) &&
           this.validarContrasenia(this.administrador.contrasenia);
  }

   async registrarAdministrador(): Promise<void> {
    if (!this.validarFormulario()) return;
    if (!await this.verificarEmailUnico(this.administrador.email)) return;

    this.administradorService.createAdministrador(this.administrador).subscribe({
      next: (response) => {
        alert('Administrador registrado con éxito!');
        this.authService.login(this.administrador.email, this.administrador.contrasenia, 'administrador').subscribe({
          next: () => this.router.navigate(['/home-administrador']),
          error: (err) => {
            console.error('Error al iniciar sesión:', err);
            alert('Registro exitoso, pero error al iniciar sesión.');
          }
        });
      },
      error: (err) => {
        console.error('Error al registrar:', err);
        alert('Error al registrar administrador. Intente nuevamente.');
      }
    });
  }
}