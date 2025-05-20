import { Component, OnInit } from '@angular/core';
import { VisitaService } from '../../servicios/visita.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro-visita',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-visita.component.html',
  styleUrls: ['./registro-visita.component.scss']
})
export class RegistroVisitaComponent implements OnInit {
  fechaSeleccionada: string = '';
  horarioSeleccionado: string = '';
  horariosDisponibles: string[] = [];
  isLoading: boolean = false;
  mensajeError: string | null = null;
  mensajeExito: string | null = null;

  constructor(
    private visitaService: VisitaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarHorariosDisponibles();
  }

  cargarHorariosDisponibles(): void {
    this.isLoading = true;
    this.visitaService.getHorariosDisponibles().subscribe({
      next: (horarios) => {
        this.horariosDisponibles = horarios;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar horarios', err);
        this.mensajeError = 'No se pudieron cargar los horarios disponibles';
        this.isLoading = false;
      }
    });
  }

  enviarSolicitud(): void {
    if (!this.fechaSeleccionada || !this.horarioSeleccionado) {
      this.mensajeError = 'Por favor selecciona una fecha y un horario';
      return;
    }

    this.mensajeError = null;
    this.mensajeExito = null;
    this.isLoading = true;

    const visitaData = {
      fecha: this.fechaSeleccionada,
      hora: this.horarioSeleccionado
    };

    this.visitaService.crearVisita(visitaData).subscribe({
      next: () => {
        this.isLoading = false;
        this.mensajeExito = 'Visita agendada correctamente';
        setTimeout(() => this.router.navigate(['/mis-visitas']), 1500);
      },
      error: (err) => {
        console.error('Error al enviar solicitud', err);
        this.isLoading = false;
        this.mensajeError = 'Error al agendar la visita. Por favor intenta nuevamente.';
      }
    });
  }

  limpiarMensajes(): void {
    this.mensajeError = null;
    this.mensajeExito = null;
  }

  cancelar(): void {
    this.router.navigate(['/detalle-hogar']);
  }
}