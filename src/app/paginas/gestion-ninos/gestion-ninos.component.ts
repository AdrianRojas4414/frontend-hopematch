import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EncargadoService } from '../../servicios/encargado.service';
import { NinoService } from '../../servicios/nino.service';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';
import { TEXTOS } from '../../config/constants';

@Component({
  selector: 'app-gestion-ninos',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-ninos.component.html',
  styleUrl: './gestion-ninos.component.scss'
})
export class GestionNinosComponent implements OnInit{
  constructor(
    private router: Router,
    private encargadoService: EncargadoService,
    private ninoService: NinoService,
    private authService: UserAuthenticationService
  ) {}
  
  public texts = TEXTOS;
  encargados: any[] = [];
  todosLosNinos: any[] = [];
  encargado_act: any = null;

  ngOnInit(): void {
    const id = this.authService.getUserId();
    const isAdmin= this.authService.isUserType('administrador');

    if(id === 0  || !isAdmin){
      this.router.navigate(['#']);
    }

    if(isAdmin){
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
            nombreHogar: encargado.nombreHogar || encargado.nombre_hogar || 'Sin nombre de hogar',
            nombreEncargado: encargado.nombre || encargado.nombre || 'Sin nombre de encargado'
          });
        });
      }
    });
  }

  eliminarNino(idNino: number): void {
    if (confirm('¿Estás seguro que deseas eliminar este niño? Esta acción es irreversible.')) {
      this.ninoService.deleteNino(idNino).subscribe({
        next: () => {
          this.todosLosNinos = this.todosLosNinos.filter((nino: any) => nino.id !== idNino);
          alert('Niño eliminado correctamente');
        },
        error: (err) => {
          console.error('Error completo:', err);
          if (err.status === 200) { 
            this.todosLosNinos = this.todosLosNinos.filter((nino: any) => nino.id !== idNino);
            alert('Niño eliminado correctamente');
          } else {
            alert(`Error al eliminar: ${err.error?.message || err.message || 'Error desconocido'}`);
          }
        }
      });
    }
  }

  volverAHome(): void {
      this.router.navigate(['/home-administrador']);
    }
}
