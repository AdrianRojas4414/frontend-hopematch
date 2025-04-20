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
    foto_hogar: ''
  }

  constructor(private encargadoService: EncargadoService, private router: Router, private authService: UserAuthenticationService){}

  registrarEncargado(): void {

    this.encargadoService.createEncargado(this.encargado).subscribe({
      next: (response) => {
        if(this.encargado.nombre == '' || this.encargado.celular == '' || this.encargado.email == '' || this.encargado.contrasenia == '' || this.encargado.nombre_hogar == '' || this.encargado.direccion_hogar == ''){
          alert("Todos los campos deben ser llenados");
        }
        else{
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
        }
      },
      error: (err) => {
        console.error('Error al registrar encargado. Todos los campos deben ser llenados:', err);
        alert('Error al registrar encargado. Todos los campos deben ser llenados.');
      }
    });
  }

}
