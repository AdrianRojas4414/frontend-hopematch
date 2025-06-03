import { Component, OnInit } from '@angular/core';
import { VisitaService } from '../../servicios/visita.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EncargadoService } from '../../servicios/encargado.service';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';
import { TEXTOS } from '../../config/constants';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registro-visita',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-visita.component.html',
  styleUrls: ['./registro-visita.component.scss']
})
export class RegistroVisitaComponent implements OnInit {

  public texts = TEXTOS;
  encargado: any = null;
  horariosDisponibles = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
  fechaSeleccionada: string = '';
  horarioSeleccionado: string = '';
  minDate: string = '';
  isLoading = false;
  mensajeError: string | null = null;
  mensajeExito: string | null = null;
  idHogar: string | null = null;

  constructor(
    private visitaService: VisitaService,
    private encargadoService: EncargadoService,
    private authService: UserAuthenticationService,
    private router: Router,
    public dialogRef: MatDialogRef<RegistroVisitaComponent>,
  ) {const today = new Date();
    this.minDate = today.toISOString().split('T')[0];}

  ngOnInit(): void {
    const padrinoId = this.authService.getUserId();
    const isPadrino = this.authService.isUserType('padrino');
    this.idHogar = localStorage.getItem('idHogarVisita');

    if (!padrinoId || !isPadrino) {
      this.router.navigate(['/detalle-hogar']);
      return;
    }

    if (this.idHogar) {
      this.encargadoService.getEncargadoById(+this.idHogar).subscribe({
        next: (data) => {
          this.encargado = data;
        },
        error: (err) => {
          console.error('Error al obtener hogar:', err);
          this.mensajeError = 'No se pudo cargar la información del hogar';
        }
      });

          }
          else {
      this.mensajeError = 'No se encontró el hogar seleccionado';
    }
  }

  

  enviarSolicitud(): void {
    if (!this.fechaSeleccionada || !this.horarioSeleccionado) {
      this.mensajeError = 'Por favor selecciona una fecha y un horario';
      return;
    }

    const padrinoId = this.authService.getUserId();

    if (!padrinoId || !this.idHogar) {
      this.mensajeError = 'Error al identificar usuario u hogar';
      return;
    }

    this.mensajeError = null;
    this.mensajeExito = null;
    this.isLoading = true;

    const currentUrl = this.router.url;

    const visitaData = {
      fechaVisita: this.fechaSeleccionada,
      horaVisita: this.horarioSeleccionado + ':00',
      padrinoId: padrinoId,
      encargadoId: +this.idHogar
    };

    this.visitaService.crearVisita(visitaData).subscribe({
      next: () => {
        this.isLoading = false;
        this.mensajeExito = 'Visita agendada correctamente. Estará pendiente de aprobación.';
        setTimeout(() => {
          localStorage.removeItem('encargadoId');
        }, 2000);
        this.mensajeExito = 'Visita agendada correctamente';
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
        });
      },
      error: (err) => {
        console.error('Error al enviar solicitud', err);
        this.isLoading = false;
        this.mensajeError = err.error?.message || 'Error al agendar la visita. Por favor intenta nuevamente.';
      }
    });
    this.dialogRef.close();
  }

  limpiarMensajes(): void {
    this.mensajeError = null;
    this.mensajeExito = null;
  }

  cancelar() {
    localStorage.removeItem("idHogarVisita");
    this.dialogRef.close();
  }
}