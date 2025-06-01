import { Component, OnInit } from '@angular/core';
import { PadrinoService } from '../../servicios/padrino.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';
import { TEXTOS } from '../../config/constants';

@Component({
  selector: 'app-padrinos-suspendidos',
  templateUrl: './padrinos-suspendidos.component.html',
  styleUrls: ['./padrinos-suspendidos.component.scss'],
  imports: [CommonModule]
})
export class PadrinosSuspendidosComponent implements OnInit {
  public texts = TEXTOS;
  padrinosSuspendidos: any[] = [];
  isLoading: boolean = true;

  constructor(
    private padrinoService: PadrinoService,
    private router: Router,
    private authService: UserAuthenticationService
  ) {}

  ngOnInit(): void {
    const id = this.authService.getUserId();
    const isAdmin= this.authService.isUserType('administrador');

    if(id === 0  || !isAdmin){
      this.router.navigate(['#']);
    }

    if(isAdmin){
      this.cargarPadrinosSuspendidos();
    }
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
    if (confirm('¿Estás seguro de poner esta cuenta En Revisión?')) {
      padrino.estado = 'En revision';
      delete padrino.contrasenia;
      this.padrinoService.updatePadrino(padrino.id, padrino).subscribe({
        next: () => {
          alert('El Padrino ha sido agregado a la lista de revisiones');
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

  irChat(idPadrino: any): void{
    localStorage.setItem("idConversacion", idPadrino.toString());
    localStorage.setItem("tipoConversacion",'padrino');
    this.router.navigate(['/chat']);
  }
}
