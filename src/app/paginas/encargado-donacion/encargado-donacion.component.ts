import { Component, OnInit } from '@angular/core';
import { DonacionService } from '../../servicios/donacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TEXTOS } from '../../config/constants';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';

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
  public texts = TEXTOS;

  mostrarFormFoto = false;
  nuevaFotoUrl = '';
  donacionIdParaFoto: number | null = null;

  mostrarFormFotosProgreso = false;
  nuevaFotoProgresoUrl = '';
  fotosProgresoTemp: string[] = [];
  donacionIdParaFotosProgreso: number | null = null;

  constructor(
    private donacionService: DonacionService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: UserAuthenticationService
  ) {}

  ngOnInit(): void {
    const encargadoId = this.authService.getUserId();
    
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
          alert('¡Comentario enviado con éxito!');
          
          this.cancelarComentario();
          const encargadoId = this.route.snapshot.paramMap.get('id');
          if (encargadoId) this.cargarDonaciones(+encargadoId);
        },
        error: (err) => {
          console.error('Error al enviar comentario:', err);
          alert('Error al enviar el comentario');
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

  mostrarFormularioFotosProgreso(donacionId: number): void {
    this.donacionIdParaFotosProgreso = donacionId;  
    const donacion = this.donaciones.find(d => d.id === donacionId);
    this.fotosProgresoTemp = donacion?.fotosProgreso ? [...donacion.fotosProgreso] : [];
  
    this.mostrarFormFotosProgreso = true;
  }

  cancelarFotosProgreso(): void {
    this.mostrarFormFotosProgreso = false;
    this.nuevaFotoProgresoUrl = '';
    this.fotosProgresoTemp = [];
    this.donacionIdParaFotosProgreso = null;
  }

  agregarFotoTemp(): void {
    if (this.nuevaFotoProgresoUrl && this.fotosProgresoTemp.length < 8) {
      this.fotosProgresoTemp.push(this.nuevaFotoProgresoUrl);
      this.nuevaFotoProgresoUrl = '';
    }
  }

  eliminarFotoTemp(index: number): void {
    this.fotosProgresoTemp.splice(index, 1);
  }

  enviarFotosProgreso(): void {
    if (this.donacionIdParaFotosProgreso) {
      this.donacionService.agregarFotosProgreso(
        this.donacionIdParaFotosProgreso,
        this.fotosProgresoTemp
      ).subscribe({
        next: () => {
          this.cancelarFotosProgreso();
          const encargadoId = this.route.snapshot.paramMap.get('id');
          if (encargadoId) this.cargarDonaciones(+encargadoId);
          alert(this.texts.fotosProgresoExito);
        },
        error: (err) => {
          console.error('Error al agregar fotos de progreso:', err);
          alert(this.texts.fotosProgresoError + (err.error?.message || err.message));
        }
      });
    }
  }

  volverAHome(): void {
    this.router.navigate(['/home-encargado']);
  }
}
