import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EncargadoService } from '../../servicios/encargado.service';
import { TEXTOS } from '../../config/constants';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';

@Component({
  selector: 'app-crear-encargado',
  imports: [RouterLink, FormsModule],
  templateUrl: './crear-encargado.component.html',
  styleUrl: './crear-encargado.component.scss'
})
export class CrearEncargadoComponent {
  public texts = TEXTOS;
  encargado = {
    nombre: '',
    celular: '',
    email: '',
    foto: '',
    contrasenia: '',
    estado: 'En revision',
    nombre_hogar: '',
    direccion_hogar: '',
    foto_hogar: '',
    descripcion:''
  }

  constructor(private encargadoService: EncargadoService, private router: Router, private authService: UserAuthenticationService){}

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
      const encargados = await this.encargadoService.getEncargados().toPromise();
      const existe = encargados.some((encargado: any) => encargado.email === email);
      if (existe) {
        alert('Este email ya está registrado. Por favor use otro.');
      }
      return !existe;
    } catch {
      return true;
    }
  }

  private validarFormulario(): boolean {
    return this.validarCampoRequerido(this.encargado.nombre, 'nombre') &&
           this.validarLongitudMinima(this.encargado.nombre, 'nombre', 3) &&
           this.validarCampoRequerido(this.encargado.celular, 'celular') &&
           this.validarCelular(this.encargado.celular) &&
           this.validarCampoRequerido(this.encargado.email, 'email') &&
           this.validarEmail(this.encargado.email) &&
           this.validarCampoRequerido(this.encargado.contrasenia, 'contraseña') &&
           this.validarLongitudMinima(this.encargado.contrasenia, 'contraseña', 8) &&
           this.validarContrasenia(this.encargado.contrasenia) &&
           this.validarCampoRequerido(this.encargado.nombre_hogar, 'nombre del hogar') &&
           this.validarCampoRequerido(this.encargado.direccion_hogar, 'dirección del hogar') &&
           this.validarCampoRequerido(this.encargado.descripcion, 'descripción') &&
           this.validarLongitudMinima(this.encargado.descripcion, 'descripción', 20);
  }

  async registrarEncargado(): Promise<void> {
    if (!this.validarFormulario()) return;
    if (!await this.verificarEmailUnico(this.encargado.email)) return;

    this.encargadoService.createEncargado(this.encargado).subscribe({
      next: (response) => {
        alert('Encargado registrado con éxito!');
        this.authService.login(this.encargado.email, this.encargado.contrasenia, 'encargado').subscribe({
          next: () => this.router.navigate(['/home-encargado']),
          error: (err) => {
            console.error('Error al iniciar sesión:', err);
            alert('Registro exitoso, pero error al iniciar sesión.');
          }
        });
      },
      error: (err) => {
        console.error('Error al registrar:', err);
        alert('Error al registrar encargado. Intente nuevamente.');
      }
    });
  }
}
