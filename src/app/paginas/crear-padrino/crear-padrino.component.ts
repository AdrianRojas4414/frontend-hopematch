import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PadrinoService } from '../../servicios/padrino.service';

@Component({
  selector: 'app-crear-padrino',
  imports: [RouterLink, FormsModule],
  templateUrl: './crear-padrino.component.html',
  styleUrl: './crear-padrino.component.scss'
})
export class CrearPadrinoComponent {
  padrino = {
    nombre: '',
    celular: '',
    email: '',
    foto: '',
    contrasenia: '',
    estado: 'En revision'
  };

  constructor(private padrinoService: PadrinoService, private router: Router) {}

  registrarPadrino(): void {
    this.padrinoService.createPadrino(this.padrino).subscribe({
      next: (response) => {
        if(this.padrino.nombre == '' || this.padrino.celular == '' || this.padrino.email == '' || this.padrino.contrasenia == ''){
          alert("Todos los campos deben ser llenados");
        }
        else{
          console.log('Padrino registrado con éxito!', response);
          alert('Padrino registrado con éxito!');
          this.router.navigate([`/home-padrino/${response.id}`]);
        }
      },
      error: (err) => {
        console.error('Error al registrar padrino. Todos los campos deben ser llenados:', err);
        alert('Error al registrar padrino. Todos los campos deben ser llenados.');
      }
    });
  }
}
