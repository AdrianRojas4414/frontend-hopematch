import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';
import { PadrinoService } from '../../servicios/padrino.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-padrinos',
  templateUrl: './gestion-padrinos.component.html',
  styleUrls: ['./gestion-padrinos.component.scss'],
  imports: [CommonModule]
})
export class GestionPadrinosComponent implements OnInit {
  padrinosPendientes: any[] = [];
  padrinosAprobados: any[] = [];
  isLoading = true;

  constructor(
    private padrinoService: PadrinoService,
    private router: Router,
    private authService: UserAuthenticationService
  ) {}

  ngOnInit(): void {
    this.cargarPadrinos();
  }

  cargarPadrinos(): void {
    console.log('Iniciando carga de padrinos...'); 
    this.padrinoService.getAllPadrinos().subscribe({
      next: (padrinos: any[]) => {
        console.log('Datos recibidos:', padrinos); 
        this.padrinosPendientes = padrinos.filter(p => p.estado === 'En revision');
        this.padrinosAprobados = padrinos.filter(p => p.estado === 'Activo');
        console.log('Pendientes:', this.padrinosPendientes); 
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar padrinos:', error); 
        this.isLoading = false;
      }
    });
  }

  aprobarPadrino(padrino: any): void {
    padrino.estado = 'Activo';
    this.padrinoService.updatePadrino(padrino.id, padrino).subscribe({
      next: () => {
        alert('Padrino aprobado exitosamente');
        this.cargarPadrinos();
      },
      error: (error) => {
        console.error('Error al aprobar padrino:', error);
        alert('Error al aprobar padrino');
      }
    });
  }
  
  rechazarPadrino(padrino: any): void {
    padrino.estado = 'Rechazado';
    this.padrinoService.updatePadrino(padrino.id, padrino).subscribe({
      next: () => {
        alert('Padrino rechazado exitosamente');
        this.cargarPadrinos();
      },
      error: (error) => {
        console.error('Error al rechazar padrino:', error);
        alert('Error al rechazar padrino');
      }
    });
  }
  
  suspenderPadrino(padrino: any): void {
    padrino.estado = 'Suspendido';
    this.padrinoService.updatePadrino(padrino.id, padrino).subscribe({
      next: () => {
        alert('Padrino suspendido exitosamente');
        this.cargarPadrinos();
      },
      error: (error) => {
        console.error('Error al suspender padrino:', error);
        alert('Error al suspender padrino');
      }
    });
  }

  verDetalles(id_padrino: any): void {
    localStorage.setItem("id_padrino", id_padrino.toString());
    this.router.navigate([`/perfil-padrino`]);
  }

  irPerfil(): void {
    this.router.navigate([`/perfil-administrador`]);
  }

  cerrarSesion(): void {
    this.authService.logout();
  }

  verSuspendidos(): void{
    this.router.navigate(['/padrinos-suspendidos'])
  }

  irChat(idPadrino: any): void{
    localStorage.setItem("idConversacion", idPadrino.toString());
    localStorage.setItem("tipoConversacion",'padrino');
    this.router.navigate(['/chat']);
  }

  volverAHome():void{
    window.history.back();
  }
}