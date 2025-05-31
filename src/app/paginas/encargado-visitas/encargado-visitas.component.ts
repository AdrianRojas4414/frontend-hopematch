import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitaService } from '../../servicios/visita.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

export interface Visita {
  id: number;
  fecha: string;
  hora: string;
  estado: 'PENDIENTE' | 'ACEPTADA' | 'RECHAZADA' | 'CANCELADA';
  padrino: {
    id: number;
    nombre: string;
  };
  encargado: {
    id: number;
    nombre: string;
  };
  fechaCreacion: string;
}

@Component({
  selector: 'app-encargado-visitas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './encargado-visitas.component.html',
  styleUrls: ['./encargado-visitas.component.scss']
})
export class EncargadoVisitasComponent implements OnInit {
  todasLasVisitas: Visita[] = [];

  constructor(
    private visitaService: VisitaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadTodasLasVisitas();
  }
 
  loadTodasLasVisitas(): void {
    this.visitaService.getAllVisitasForEncargado().subscribe({
      next: (data: Visita[]) => {
        this.todasLasVisitas = data;
      },
      error: (error: any) => {
        console.error('Error al cargar todas las visitas:', error);
        alert('Error al cargar las solicitudes de visita.');
      }
    });
  }

  acceptVisita(visitaId: number): void {
    this.visitaService.acceptVisita(visitaId).subscribe({
      next: (response: string) => {
        console.log('Visita aceptada:', response);
        alert('Solicitud de visita aceptada.');
        this.loadTodasLasVisitas();
      },
      error: (error: any) => {
        console.error('Error al aceptar visita:', error);
        alert('Error al aceptar la solicitud de visita.');
      }
    });
  }

  denyVisita(visitaId: number): void {
    this.visitaService.denyVisita(visitaId).subscribe({
      next: (response: string) => {
        console.log('Visita denegada:', response);
        alert('Solicitud de visita denegada.');
        this.loadTodasLasVisitas();
      },
      error: (error: any) => {
        console.error('Error al denegar visita:', error);
        alert('Error al denegar la solicitud de visita.');
      }
    });
  }

  volverAHome(): void {
    this.router.navigate(['/home-encargado']);
  }

  mostrarAcciones(estado: string): boolean {
    return estado === 'PENDIENTE';
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'PENDIENTE':
        return 'estado-pendiente';
      case 'ACEPTADA':
        return 'estado-aceptada';
      case 'RECHAZADA':
        return 'estado-rechazada';
      case 'CANCELADA':
        return 'estado-cancelada';
      default:
        return '';
    }
  }
}
