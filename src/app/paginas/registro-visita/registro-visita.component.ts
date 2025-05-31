import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VisitaService } from '../../servicios/visita.service';
import { EncargadoService } from '../../servicios/encargado.service';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';
import { TEXTOS } from '../../config/constants';

@Component({
  selector: 'app-registro-visita',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-visita.component.html',
  styleUrls: ['./registro-visita.component.scss']
})
export class RegistroVisitaComponent implements OnInit {
  visita = {
    padrino_id: null as number | null,
    encargado_id: null as number | null,
    fecha_visita: '',
    hora_visita: ''
  };

  public texts = TEXTOS;

  encargado: any = null;
  horariosDisponibles = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
  minDate: string;
  isLoading = false;
  mensajeError: string | null = null;
  mensajeExito: string | null = null;

  constructor(
    private visitaService: VisitaService,
    private encargadoService: EncargadoService,
    private authService: UserAuthenticationService,
    private router: Router
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    const padrinoId = this.authService.getUserId();
    const encargadoId = localStorage.getItem('encargadoId');

    if (padrinoId && encargadoId) {
      this.visita.padrino_id = +padrinoId;
      this.visita.encargado_id = +encargadoId;

      this.encargadoService.getEncargadoById(this.visita.encargado_id).subscribe({
        next: (data: any) => this.encargado = data,
        error: (err: any) => {
          console.error('Error al obtener encargado:', err);
          this.mensajeError = 'Error al cargar información del hogar';
        }
      });
    }
  }

  registrarVisita(): void {
    if (!this.visita.fecha_visita || !this.visita.hora_visita) {
      this.mensajeError = 'Por favor complete todos los campos';
      return;
    }

    this.isLoading = true;
    this.mensajeError = null;
    this.mensajeExito = null;

    const visitaData = {
      fechaVisita: this.visita.fecha_visita,
      horaVisita: this.visita.hora_visita,
      padrinoId: this.visita.padrino_id,
      encargadoId: this.visita.encargado_id
    };

    this.visitaService.registrarVisita(visitaData).subscribe({
      next: () => {
        this.isLoading = false;
        this.mensajeExito = 'Visita agendada correctamente. Estará pendiente de aprobación.';
        setTimeout(() => {
          localStorage.removeItem('encargadoId');
          this.router.navigate(['/mis-visitas']);
        }, 2000);
      },
      error: (error) => {
        console.error('Error al agendar visita:', error);
        this.isLoading = false;
        this.mensajeError = 'Error al agendar visita. Por favor intente nuevamente.';
      }
    });
  }

  limpiarMensajes(): void {
    this.mensajeError = null;
    this.mensajeExito = null;
  }

  cancelar(): void {
    localStorage.removeItem('encargadoId');
    this.router.navigate(['/home-padrino']);
  }
}
