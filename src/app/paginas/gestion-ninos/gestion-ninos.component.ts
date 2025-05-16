import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EncargadoService } from '../../servicios/encargado.service';
import { NinoService } from '../../servicios/nino.service';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';

@Component({
  selector: 'app-gestion-ninos',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './gestion-ninos.component.html',
  styleUrl: './gestion-ninos.component.scss'
})
export class GestionNinosComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private encargadoService: EncargadoService,
    private ninoService: NinoService,
    private authService: UserAuthenticationService
  ) {}
  
  encargados: any[] = [];
  todosLosNinos: any[] = [];

  ngOnInit(): void {
    this.encargadoService.getEncargados().subscribe({
      next: (data) => {
        this.encargados = data;
        this.recolectarTodosLosNinos();
      },
      error: (err) => {
        console.error('Error al obtener encargados:', err);
      }
    });
  }

  cerrarSesion(): void {
    this.authService.logout();
  }


  recolectarTodosLosNinos(): void {
    this.todosLosNinos = [];
    this.encargados.forEach(encargado => {
      if (encargado.ninos && Array.isArray(encargado.ninos)) {
        encargado.ninos.forEach((nino: any) => {
          this.todosLosNinos.push({
            ...nino,
            nombreHogar: encargado.nombreHogar || encargado.nombre || 'Sin nombre de hogar'
          });
        });
      }
    });
  }

  eliminarNino(idNino: number): void {
    if (confirm('¿Estás seguro que deseas eliminar este niño? Esta acción es irreversible.')) {
      this.ninoService.deleteNino(idNino).subscribe({
        next: () => {
          // Elimina el niño del array local
          this.todosLosNinos = this.todosLosNinos.filter((nino: any) => nino.id !== idNino);
          alert('Niño eliminado correctamente');
        },
        error: (err) => {
          console.error('Error al eliminar el niño:', err);
          alert(`Error al eliminar: ${err.error?.message || err.message || 'Error desconocido'}`);
        }
      });
    }
  }
}
