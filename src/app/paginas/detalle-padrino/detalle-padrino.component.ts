import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PadrinoService } from '../../servicios/padrino.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-padrino',
  templateUrl: './detalle-padrino.component.html',
  styleUrls: ['./detalle-padrino.component.scss'],
  imports: [CommonModule]
})
export class DetallePadrinoComponent implements OnInit {
  padrino: any = null;
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private padrinoService: PadrinoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.cargarPadrino(id);
  }

  cargarPadrino(id: number): void {
    this.isLoading = true;
    this.errorMessage = null; 
    
    this.padrinoService.getPadrinoById(id).subscribe({
      next: (data) => {
        this.padrino = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar padrino:', err);
        this.isLoading = false;
        this.errorMessage = 'Error al cargar los datos del padrino'; 
        setTimeout(() => this.volverAGestion(), 3000); 
      }
    });
  }

  suspenderPadrino(): void {
    if (confirm('¿Estás seguro de suspender a este padrino?')) {
      this.padrino.estado = 'Suspendido';
      this.padrinoService.updatePadrino(this.padrino.id, this.padrino).subscribe({
        next: () => {
          alert('Padrino suspendido correctamente');
        },
        error: (err) => {
          console.error('Error al suspender padrino:', err);
          this.errorMessage = 'Error al suspender padrino'; 
        }
      });
    }
  }

  volverAGestion(): void {
    this.router.navigate(['/gestion-padrinos']);
  }
}