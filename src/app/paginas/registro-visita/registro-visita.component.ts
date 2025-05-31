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
  fechaSeleccionada: string = '';
  horarioSeleccionado: string = '';
  horariosDisponibles: string[] = [];
  isLoading: boolean = false;
  mensajeError: string | null = null;
  mensajeExito: string | null = null;
  idPadrino: any = null;

  constructor(
    private visitaService: VisitaService,
    private router: Router,
    private encargadoService: EncargadoService,
    private authService: UserAuthenticationService,
    public dialogRef: MatDialogRef<RegistroVisitaComponent>,
  ) {}

  ngOnInit(): void {
    const id_hogar = localStorage.getItem('idHogarVisita');
    const id = this.authService.getUserId();
    const isPadrino= this.authService.isUserType('padrino');

    if(id === 0  || !isPadrino){
      this.router.navigate(['#']);
    }

    if (id_hogar && isPadrino) {
      this.encargadoService.getEncargadoById(+id_hogar).subscribe({
        next: (data) => {
          this.encargado = data;
          this.idPadrino = id;
        },
        error: (err) => {
          console.error('Error al obtener hogar:', err);
        }
      });
    }
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

    const currentUrl = this.router.url;

    const visitaData = {
      fecha: this.fechaSeleccionada,
      hora: this.horarioSeleccionado
    };

    this.visitaService.crearVisita(visitaData).subscribe({
      next: () => {
        this.isLoading = false;
        this.mensajeExito = 'Visita agendada correctamente';
        setTimeout(() => this.router.navigate(['/mis-visitas']), 1500);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
        });
      },
      error: (err) => {
        console.error('Error al enviar solicitud', err);
        this.isLoading = false;
        this.mensajeError = 'Error al agendar la visita. Por favor intenta nuevamente.';
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