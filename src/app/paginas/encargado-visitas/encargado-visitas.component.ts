import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitaService } from '../../servicios/visita.service';
import { Router } from '@angular/router';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';

export interface Visita {
  id: number;
  padrinoId: number;
  encargadoId: number;
  fechaVisita: string; 
  horaVisita: string;
  estadoVisita: 'EN_REVISION' | 'ACEPTADA' | 'RECHAZADA';
}

@Component({
  selector: 'app-encargado-visitas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './encargado-visitas.component.html',
  styleUrls: ['./encargado-visitas.component.scss'] 
})
export class EncargadoVisitasComponent implements OnInit {

  visitas: Visita[] = [];

  constructor(
    private visitaService: VisitaService,
    private router: Router,
    private authService: UserAuthenticationService
  ) {}

  ngOnInit(): void {
    const encargadoId = this.authService.getUserId();
    const isEncargado = this.authService.isUserType('encargado');

    if (encargadoId === 0 || !isEncargado) {
      console.warn('usuario no autenticado...');
      this.router.navigate(['/']);
      return; 
    }

    this.cargarVisitas(encargadoId);
  }

  cargarVisitas(encargadoId: number): void {
    this.visitaService.getAllVisitasForEncargado(encargadoId).subscribe({
      next: (data: Visita[]) => {
        this.visitas = data;
        if (this.visitas.length === 0) {
          console.log('El array de visitas está vacío.');
        }
      },
      error: (error: any) => {
        console.error('Error al cargar las visitas del encargado:', error);
        alert('Error al cargar las solicitudes de visita.');
      }
    });
  }

  aceptarVisita(id: number): void {
    this.visitaService.acceptVisita(id).subscribe({
      next: () => {
        alert('Solicitud de visita aceptada.');
        this.cargarVisitas(this.authService.getUserId());
      },
      error: (error) => {
        console.error('Error al aceptar visita:', error);
        alert('Error al aceptar la solicitud de visita.');
      }
    });
  }

  rechazarVisita(id: number): void {
    this.visitaService.denyVisita(id).subscribe({
      next: () => {
        alert('Solicitud de visita denegada.');
        this.cargarVisitas(this.authService.getUserId());
      },
      error: (error) => {
        console.error('Error al denegar visita:', error);
        alert('Error al denegar la solicitud de visita.');
      }
    });
  }

  volverAHome(): void {
    this.router.navigate(['/home-encargado']);
  }

  mostrarAcciones(estadoVisita: string): boolean {
    return estadoVisita === 'EN_REVISION';
  }

  getEstadoClass(estadoVisita: string): string {
    switch (estadoVisita) {
      case 'EN_REVISION':
        return 'status-in-review';
      case 'ACEPTADA':
        return 'status-accepted';    
      case 'RECHAZADA':
        return 'status-rejected';
      default:
        return ''; 
    }
  }

  irChat(padrinoId: number): void {
    localStorage.setItem("idConversacion", padrinoId.toString());
    localStorage.setItem("tipoConversacion", 'padrino');
    this.router.navigate(['/chat']);
  }
}