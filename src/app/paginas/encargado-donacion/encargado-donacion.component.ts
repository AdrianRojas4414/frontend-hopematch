import { Component, OnInit } from '@angular/core';
import { DonacionService } from '../../servicios/donacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-encargado-donacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './encargado-donacion.component.html',
  styleUrls: ['./encargado-donacion.component.scss']
})
export class EncargadoDonacionComponent implements OnInit {
  donaciones: any[] = [];
  mostrarFormulario = false;
  nuevoComentario = '';
  donacionSeleccionadaId: number | null = null;

  mostrarFormFoto = false;
  nuevaFotoUrl = '';
  donacionIdParaFoto: number | null = null;

  constructor(
    private donacionService: DonacionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const encargadoId = this.route.snapshot.paramMap.get('id');
    if (encargadoId) {
      this.cargarDonaciones(+encargadoId);
    }
  }

  cargarDonaciones(encargadoId: number): void {
    this.donacionService.getDonacionesByEncargado(encargadoId).subscribe({
      next: (data) => {
        this.donaciones = data;
      },
      error: (err) => {
        console.error('Error al cargar donaciones:', err);
      }
    });
  }

  verDetalles(donacionId: number): void {
    this.router.navigate([`/detalle-donacion/${donacionId}`]);
  }

  mostrarFormularioComentario(donacionId: number): void {
    this.donacionSeleccionadaId = donacionId;
    this.mostrarFormulario = true;
  }

  cancelarComentario(): void {
    this.mostrarFormulario = false;
    this.nuevoComentario = '';
    this.donacionSeleccionadaId = null;
  }

  enviarComentario(): void {
    if (this.donacionSeleccionadaId && this.nuevoComentario) {
      this.donacionService.agregarComentarioEncargado(
        this.donacionSeleccionadaId, 
        this.nuevoComentario
      ).subscribe({
        next: () => {
          this.cancelarComentario();
          // Recargar las donaciones para ver los cambios
          const encargadoId = this.route.snapshot.paramMap.get('id');
          if (encargadoId) this.cargarDonaciones(+encargadoId);
        },
        error: (err) => {
          console.error('Error al enviar comentario:', err);
        }
      });
    }
  }
  mostrarFormularioFoto(donacionId: number): void {
    this.donacionIdParaFoto = donacionId;
    this.mostrarFormFoto = true;
  }

  cancelarFoto(): void {
    this.mostrarFormFoto = false;
    this.nuevaFotoUrl = '';
    this.donacionIdParaFoto = null;
  }

  enviarFoto(): void {
    if (this.donacionIdParaFoto && this.nuevaFotoUrl) {
      this.donacionService.actualizarFotoDonacion(
        this.donacionIdParaFoto, 
        this.nuevaFotoUrl
      ).subscribe({
        next: () => {
          this.cancelarFoto();
          const encargadoId = this.route.snapshot.paramMap.get('id');
          if (encargadoId) this.cargarDonaciones(+encargadoId);
        },
        error: (err) => {
          console.error('Error al actualizar foto:', err);
        }
      });
    }
  }

  volverAHome(): void {
    this.router.navigate(['/home-encargado']);
  }
}
