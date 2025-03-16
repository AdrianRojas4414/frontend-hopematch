import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EncargadoService } from '../../servicios/encargado.service';

@Component({
  selector: 'app-crear-encargado',
  imports: [RouterLink, FormsModule],
  templateUrl: './crear-encargado.component.html',
  styleUrl: './crear-encargado.component.scss'
})
export class CrearEncargadoComponent {
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
        console.log('Encargado registrado con éxito!', response);
        alert('Encargado registrado con éxito!');
        this.router.navigate([`/perfil-encargado/${response.id}`]);
      },
      error: (err) => {
        console.error('Error al registrar encargado:', err);
        alert('Error al registrar encargado.');
      }
    });
  }

}
