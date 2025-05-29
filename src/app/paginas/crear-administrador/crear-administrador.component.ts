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
  imports: [RouterLink, FormsModule],
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

  registrarAdministrador(): void {

    if(this.administrador.nombre === '' || this.administrador.email === '' || this.administrador.contrasenia === '') {
      alert("Todos los campos obligatorios (*) deben ser llenados");
    }

    else{
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
          console.error('Error al registrar encargado. Todos los campos obligatorios (*) deben ser llenados:', err);
          alert('Error al registrar encargado. Todos los campos obligatorios (*) deben ser llenados.');
        }
      });
    }
  }
}