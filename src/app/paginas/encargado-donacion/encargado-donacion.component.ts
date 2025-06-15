import { Component, OnInit } from '@angular/core';
import { DonacionService } from '../../servicios/donacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TEXTOS } from '../../config/constants';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';
import { EncargadoService } from '../../servicios/encargado.service';

@Component({
  selector: 'app-encargado-donacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './encargado-donacion.component.html',
  styleUrls: ['./encargado-donacion.component.scss']
})
export class EncargadoDonacionComponent implements OnInit {
  public texts = TEXTOS;
  donaciones: any[] = [];
  mostrarFormulario = false;
  nuevoComentario = '';
  donacionSeleccionadaId: number | null = null;
  encargado: any  = null;
    
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
    private authService: UserAuthenticationService,
    private encargadoService: EncargadoService
  ) {}

  ngOnInit(): void {
    const encargadoId = this.authService.getUserId();
    const isEncargado = this.authService.isUserType('encargado');

    if(encargadoId === 0  || !isEncargado){
      this.router.navigate(['#']);
    }

    if (isEncargado) {
      this.cargarDonaciones(+encargadoId);
    }
  }

  cargarDonaciones(encargadoId: number): void {
    this.donacionService.getDonacionesByEncargado(encargadoId).subscribe({
      next: (data) => {
        this.donaciones = data;
        this.encargadoService.getEncargadoById(encargadoId).subscribe({
          next:(data) => {
            this.encargado = data;
          },
          error:(err)=>{
            console.error('Error al cargar encargado:', err);
          }
        })
      },
      error: (err) => {
        console.error('Error al cargar donaciones:', err);
      }
    });
  }

    private validarCampoRequerido(valor: string, campo: string): boolean {
    if (!valor?.trim()) {
      alert(`El campo ${campo} es obligatorio`);
      return false;
    }
    return true;
  }

  private validarFotoUnica(url: string, listaFotos: string[]): boolean {
    if (listaFotos.includes(url)) {
      alert('Esta foto ya ha sido agregada');
      return false;
    }
    return true;
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
    if (!this.validarCampoRequerido(this.nuevaFotoUrl, 'URL de foto')) return;
    if (!this.donacionIdParaFoto) return;

    this.donacionService.actualizarFotoDonacion(
      this.donacionIdParaFoto, 
      this.nuevaFotoUrl
    ).subscribe({
      next: () => {
        this.cancelarFoto();
        const encargadoId = this.route.snapshot.paramMap.get('id');
        if (encargadoId) this.cargarDonaciones(+encargadoId);
        alert('Foto de comprobante actualizada con éxito');
      },
      error: (err) => {
        console.error('Error al actualizar foto:', err);
        alert('Error al actualizar la foto de comprobante');
      }
    });
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
    if (!this.validarCampoRequerido(this.nuevaFotoProgresoUrl, 'URL de foto')) return;
    if (!this.validarFotoUnica(this.nuevaFotoProgresoUrl, this.fotosProgresoTemp)) return;
    if (this.fotosProgresoTemp.length >= 8) {
      alert('Máximo 8 fotos permitidas');
      return;
    }

    this.fotosProgresoTemp.push(this.nuevaFotoProgresoUrl);
    this.nuevaFotoProgresoUrl = '';
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

  irChat(idPadrino: any): void{
    localStorage.setItem("idConversacion", idPadrino.toString());
    localStorage.setItem("tipoConversacion",'padrino');
    this.router.navigate(['/chat']);
  }
}
