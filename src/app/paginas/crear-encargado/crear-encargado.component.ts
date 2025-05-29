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

  validarCampos(): boolean {
    if (!this.encargado.nombre || !this.encargado.celular || !this.encargado.email || 
        !this.encargado.contrasenia || !this.encargado.nombre_hogar || 
        !this.encargado.direccion_hogar || !this.encargado.descripcion) {
      return false;
    }

    if (this.encargado.nombre.length < 3) {
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.encargado.email)) {
      alert('Ingrese un email válido (ejemplo: usuario@dominio.com)');
      return false;
    }

    if (this.encargado.celular.length < 8) {
      return false;
    }

    if (this.encargado.contrasenia.length < 8) {
      return false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(this.encargado.contrasenia)) {
      return false;
    }

    if (this.encargado.descripcion.length < 20) {
      return false;
    }

    return true;
  }

  verificarEmailUnico(email: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.encargadoService.getEncargados().subscribe({
        next: (encargados) => {
          const existe = encargados.some((encargado: any) => encargado.email === email);
          resolve(!existe);
        },
        error: () => {
          resolve(true);
        }
      });
    });
  }

  async registrarEncargado(): Promise<void> {
    if (!this.validarCampos()) {
      alert("Por favor complete todos los campos correctamente");
      return;
    }

    const emailUnico = await this.verificarEmailUnico(this.encargado.email);
    if (!emailUnico) {
      alert('Este email ya está registrado. Por favor use otro.');
      return;
    }

    this.encargadoService.createEncargado(this.encargado).subscribe({
      next: (response) => {
          console.log('Encargado registrado con éxito!', response);
          alert('Encargado registrado con éxito!');
          this.authService.login(this.encargado.email, this.encargado.contrasenia, 'encargado').subscribe({
            next: () => {
              this.router.navigate(['/home-encargado']);
            },
            error: (err) => {
              console.error('Error al iniciar sesión después del registro:', err);
              alert('Registro exitoso, pero error al iniciar sesión.');
            }
           });
      },
      error: (err) => {
        console.error('Error al registrar encargado:', err);
        alert('Error al registrar encargado. Por favor intente nuevamente.');
      }
    });
  }
}
