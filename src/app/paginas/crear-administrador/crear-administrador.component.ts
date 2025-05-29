import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdministradorService } from '../../servicios/administrador.service';
import { TEXTOS } from '../../config/constants';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';

@Component({
  selector: 'app-crear-administrador',
  standalone: true,
  imports: [FormsModule],
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

  constructor(
    private administradorService: AdministradorService, 
    private router: Router, 
    private authService: UserAuthenticationService
  ) {}

  validarFormulario(): boolean {
    if (!this.administrador.nombre.trim()) {
      alert('El nombre es obligatorio');
      return false;
    } else if (this.administrador.nombre.length < 3) {
      alert('El nombre debe tener al menos 3 caracteres');
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!this.administrador.email.trim()) {
      alert('El email es obligatorio');
      return false;
    } else if (!emailRegex.test(this.administrador.email)) {
      alert('Ingrese un email válido (ejemplo: usuario@dominio.com)');
      return false;
    }

    if (!this.administrador.contrasenia) {
      alert('La contraseña es obligatoria');
      return false;
    } else if (this.administrador.contrasenia.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres');
      return false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(this.administrador.contrasenia)) {
      alert('La contraseña debe contener al menos:\n- Una letra mayúscula\n- Una letra minúscula\n- Un número\n- Un carácter especial (@$!%*?&)');
      return false;
    }

    return true;
  }

  verificarEmailUnico(email: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.administradorService.getAdministradores().subscribe({
        next: (administradores) => {
          const existe = administradores.some((admin: any) => admin.email === email);
          resolve(!existe);
        },
        error: () => {
          resolve(true);
        }
      });
    });
  }

   async registrarAdministrador(): Promise<void> {
    if (!this.validarFormulario()) {
      return;
    }

    const emailUnico = await this.verificarEmailUnico(this.administrador.email);
    if (!emailUnico) {
      alert('Este email ya está registrado. Por favor use otro.');
      return;
    }

    this.administradorService.createAdministrador(this.administrador).subscribe({
      next: (response) => {
        console.log('Administrador registrado con éxito!', response);
        alert('Administrador registrado con éxito!');
        this.authService.login(this.administrador.email, this.administrador.contrasenia, 'administrador').subscribe({
          next: () => {
            this.router.navigate(['/home-administrador']);
          },
          error: (err) => {
            console.error('Error al iniciar sesión después del registro:', err);
            alert('Registro exitoso, pero hubo un error al iniciar sesión.');
          }
        });
      },
      error: (err) => {
        console.error('Error al registrar administrador:', err);
        alert('Error al registrar administrador. Por favor, intente nuevamente.');
      }
    });
  }
  cancelarRegistro(): void {
    this.router.navigate(['/inicio']);
  }
}