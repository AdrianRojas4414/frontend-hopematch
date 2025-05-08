import { Component, OnInit } from '@angular/core';
import { PadrinoService } from '../../servicios/padrino.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-padrinos-suspendidos',
  templateUrl: './padrinos-suspendidos.component.html',
  styleUrls: ['./padrinos-suspendidos.component.scss'],
  imports: [CommonModule]
})
export class PadrinosSuspendidosComponent implements OnInit {
  padrinosSuspendidos: any[] = [];
  isLoading: boolean = true;

  constructor(
    private padrinoService: PadrinoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarPadrinosSuspendidos();
  }

  cargarPadrinosSuspendidos(): void {
    this.padrinoService.getAllPadrinos().subscribe({
      next: (padrinos: any[]) => {
        this.padrinosSuspendidos = padrinos.filter(p => p.estado === 'Suspendido');
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar padrinos suspendidos:', error);
        this.isLoading = false;
      }
    });
  }

  ponerEnRevision(padrino: any): void {
    if (confirm('¿Estás seguro de poner esta cuenta en revisión?')) {
      padrino.estado = 'En revision';
      this.padrinoService.updatePadrino(padrino.id, padrino).subscribe({
        next: () => {
          alert('Padrino aprobado exitosamente');
          this.cargarPadrinosSuspendidos();
        },
        error: (error) => {
          console.error('Error al aprobar padrino:', error);
          alert('Error al aprobar padrino');
        }
      });
    }
  }

  volverAGestion(): void {
    this.router.navigate(['/gestion-padrinos']);
  }
}
