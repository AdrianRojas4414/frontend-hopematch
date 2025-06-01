import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PadrinoService } from '../../servicios/padrino.service';
import { TEXTOS } from '../../config/constants';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-padrino',
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-padrino.component.html',
  styleUrl: './crear-padrino.component.scss'
})
export class CrearPadrinoComponent {
  public texts = TEXTOS;
  padrino = {
    nombre: '',
    celular: '',
    email: '',
    foto: '',
    contrasenia: '',
    estado: 'En revision'
  };
  mostrarContrasenia: boolean = false;
  
  constructor(
    private padrinoService: PadrinoService, 
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

  private validarCelular(celular: string): boolean {
    if (!/^\d{8}$/.test(celular)) {
      alert('El celular debe tener exactamente 8 dígitos');
      return false;
    }
    return true;
  }   
      
  private async verificarEmailUnico(email: string): Promise<boolean> {
    try {
      const padrinos = await this.padrinoService.getPadrinos().toPromise();
      const existe = padrinos.some((padrino: any) => padrino.email === email);
      if (existe) {
        alert('Este email ya está registrado. Por favor use otro.');
      }
      return !existe;
    } catch {
      return true;
    }
  }

  private validarFormulario(): boolean {
    return this.validarCampoRequerido(this.padrino.nombre, 'nombre') &&
           this.validarLongitudMinima(this.padrino.nombre, 'nombre', 3) &&
           this.validarCampoRequerido(this.padrino.celular, 'celular') &&
           this.validarCelular(this.padrino.celular) &&
           this.validarCampoRequerido(this.padrino.email, 'email') &&
           this.validarEmail(this.padrino.email) &&
           this.validarCampoRequerido(this.padrino.contrasenia, 'contraseña') &&
           this.validarLongitudMinima(this.padrino.contrasenia, 'contraseña', 8) &&
           this.validarContrasenia(this.padrino.contrasenia);
  }

  async registrarPadrino(): Promise<void> {
    if (!this.validarFormulario()) return;
    if (!await this.verificarEmailUnico(this.padrino.email)) return;

    this.padrinoService.createPadrino(this.padrino).subscribe({
      next: (response) => {
        alert('Padrino registrado con éxito!');
        this.authService.login(this.padrino.email, this.padrino.contrasenia, 'padrino').subscribe({
          next: () => this.router.navigate(['/home-padrino']),
          error: (err) => {
            console.error('Error al iniciar sesión:', err);
            alert('Registro exitoso, pero error al iniciar sesión.');
          }
        });
      },
      error: (err) => {
        console.error('Error al registrar:', err);
        alert('Error al registrar padrino. Intente nuevamente.');
      }
    });
  }

  cancelarRegistro(): void {
      this.router.navigate(['/inicio']);
    }

}