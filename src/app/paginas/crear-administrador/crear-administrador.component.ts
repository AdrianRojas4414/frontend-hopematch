import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdministradorService } from '../../servicios/administrador.service';
import { TEXTOS } from '../../config/constants';

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

  constructor(private administradorService: AdministradorService, private router: Router) {}

  registrarAdministrador(): void {
    if(this.administrador.nombre === '' || this.administrador.email === '' || this.administrador.contrasenia === '') {
      alert("Todos los campos deben ser llenados");
      return;
    }

    this.administradorService.createAdministrador(this.administrador).subscribe({
      next: (response) => {
        console.log('Administrador registrado con éxito!', response);
        alert('Administrador registrado con éxito!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al registrar administrador:', err);
        alert('Error al registrar administrador. Verifique los datos.');
      }
    });
  }
}