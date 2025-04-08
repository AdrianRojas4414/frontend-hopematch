import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EncargadoService } from '../../servicios/encargado.service';
import { TEXTOS } from '../../config/constants';

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
    direccion_hogar: ''
  }

  constructor(private encargadoService: EncargadoService, private router: Router){}

  registrarEncargado(): void {

    this.encargadoService.createEncargado(this.encargado).subscribe({
      next: (response) => {
        if(this.encargado.nombre == '' || this.encargado.celular == '' || this.encargado.email == '' || this.encargado.contrasenia == '' || this.encargado.nombre_hogar == '' || this.encargado.direccion_hogar == ''){
          alert("Todos los campos deben ser llenados");
        }
        else{
          console.log('Encargado registrado con éxito!', response);
          alert('Encargado registrado con éxito!');
          this.router.navigate([`/home-encargado/${response.id}`]);
        }
      },
      error: (err) => {
        console.error('Error al registrar encargado. Todos los campos deben ser llenados:', err);
        alert('Error al registrar encargado. Todos los campos deben ser llenados.');
      }
    });
  }

}
