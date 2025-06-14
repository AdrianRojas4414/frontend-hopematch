import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';
import { PadrinoService } from '../../servicios/padrino.service';
import { CommonModule } from '@angular/common';
import { TEXTOS } from '../../config/constants';

@Component({
  selector: 'app-gestion-padrinos',
  templateUrl: './gestion-padrinos.component.html',
  styleUrls: ['./gestion-padrinos.component.scss'],
  imports: [CommonModule]
})
export class GestionPadrinosComponent implements OnInit {
  public texts = TEXTOS;
  padrinosPendientes: any[] = [];
  padrinosAprobados: any[] = [];
  isLoading = true;

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
      this.cargarPadrinos();
    }
  }

  cargarPadrinos(): void {
    console.log('Iniciando carga de padrinos...'); 
    this.padrinoService.getAllPadrinos().subscribe({
      next: (padrinos: any[]) => {
        console.log('Datos recibidos:', padrinos); 
        this.padrinosPendientes = padrinos.filter(p => p.estado === 'En revision');
        this.padrinosAprobados = padrinos.filter(p => p.estado === 'Aprobado');
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
    padrino.estado = 'Aprobado';
    delete padrino.contrasenia;
    this.padrinoService.updatePadrino(padrino.id, padrino).subscribe({
      next: () => {
        alert('Padrino Aprobado exitosamente');
        this.cargarPadrinos();
      },
      error: (error) => {
        console.error('Error al aprobar padrino:', error);
        alert('Error al aprobar padrino');
      }
    });
  }
  
  rechazarPadrino(padrino: any): void {
    padrino.estado = 'Suspendido';
    delete padrino.contrasenia;
    this.padrinoService.updatePadrino(padrino.id, padrino).subscribe({
      next: () => {
        alert('El Padrino fue Suspendido, puede ver los Padrinos Suspendidos en el apartado "Padrinos Suspendidos"');
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
    delete padrino.contrasenia;
    this.padrinoService.updatePadrino(padrino.id, padrino).subscribe({
      next: () => {
        alert('El Padrino fue Suspendido, puede ver los Padrinos Suspendidos en el apartado "Padrinos Suspendidos"');
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
    this.router.navigate(['/home-administrador']);
  }
}