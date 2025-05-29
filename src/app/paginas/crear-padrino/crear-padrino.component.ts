import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PadrinoService } from '../../servicios/padrino.service';
import { TEXTOS } from '../../config/constants';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';

@Component({
  selector: 'app-crear-padrino',
  imports: [RouterLink, FormsModule],
  templateUrl: './crear-padrino.component.html',
  styleUrl: './crear-padrino.component.scss'
})
export class CrearPadrinoComponent {
  private padrinoCreado = false;
  public texts = TEXTOS;
  padrino = {
    nombre: '',
    celular: '',
    email: '',
    foto: '',
    contrasenia: '',
    estado: 'En revision'
  };

  constructor(private padrinoService: PadrinoService, private router: Router, private authService: UserAuthenticationService) {}

  private validarFormatoEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  private validarContrasenia(contrasenia: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(contrasenia);
  }

  private async validarEmailUnico(email: string): Promise<boolean> {
    try {
      const padrinos = await this.padrinoService.getPadrinos().toPromise();
      return !padrinos.some((p: any) => p.email === email);
    } catch (error) {
      console.error('Error al verificar email:', error);
      return true;
    }
  }

  private validarCampos(): boolean {
    if (!this.padrino.nombre || !this.padrino.celular || 
        !this.padrino.email || !this.padrino.contrasenia) {
      return false;
    }

    if (this.padrino.nombre.trim().length < 3) {
      return false;
    }

    if (!this.validarFormatoEmail(this.padrino.email)) {
      return false;
    }

    if (!/^\d{8}$/.test(this.padrino.celular)) {
      return false;
    }

    if (!this.validarContrasenia(this.padrino.contrasenia)) {
      return false;
    }

    return true;
  }

  async registrarPadrino(): Promise<void> {
    if (!this.validarCampos()) {
      alert("Por favor complete todos los campos correctamente");
      return;
    }

    const emailUnico = await this.validarEmailUnico(this.padrino.email);
    if (!emailUnico) {
      alert("No se puede completar el registro");
      return;
    }

    this.padrinoService.createPadrino(this.padrino).subscribe({
      next: (response) => {
        console.log('Padrino registrado con éxito!', response);
        alert('Padrino registrado con éxito!');
        this.authService.login(this.padrino.email, this.padrino.contrasenia, 'padrino').subscribe({
          next: () => {
            this.router.navigate(['/home-padrino']);
          },
          error: (err) => {
            console.error('Error al iniciar sesión después del registro:', err);
            alert('Registro exitoso, pero error al iniciar sesión.');
          }
        });
      },
      error: (err) => {
        console.error('Error al registrar padrino:', err);
        alert('Error al registrar padrino. Por favor intente nuevamente.');
      }
    });
  }
}
