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
    foto: '', // Opcional
    contrasenia: '',
    estado: 'En revision' // Se asigna automáticamente
  };

  constructor(private padrinoService: PadrinoService, private router: Router) {}

  registrarPadrino(): void {
    this.padrinoService.createPadrino(this.padrino).subscribe({
      next: () => {
        console.log('Padrino registrado con éxito!');
        alert('Padrino registrado con éxito!');
        this.router.navigate(['/inicio']); // Redirige tras éxito
      },
      error: (err) => {
        console.error('Error al registrar padrino:', err);
        alert('Error al registrar padrino.');
      }
    });
  }
}
