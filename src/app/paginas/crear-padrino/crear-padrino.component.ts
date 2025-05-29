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
  public texts = TEXTOS;
  padrino = {
    nombre: '',
    celular: '',
    email: '',
    foto: '',
    contrasenia: '',
    estado: 'En revision'
  };

  constructor(
    private padrinoService: PadrinoService, 
    private router: Router, 
    private authService: UserAuthenticationService
  ) {}

  registrarPadrino(): void {

    if(this.padrino.nombre == '' || this.padrino.celular == '' || this.padrino.email == '' || this.padrino.contrasenia == ''){
      alert("Todos los campos obligatorios (*) deben ser llenados");
    }
    
    else{
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
          console.error('Error al registrar padrino. Todos los campos obligatorios (*) deben ser llenados:', err);
          alert('Error al registrar padrino. Todos los campos obligatorios (*) deben ser llenados.');
        }
      });
    }
  }
}
