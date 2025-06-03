import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdministradorService } from '../../servicios/administrador.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';
import { TEXTOS } from '../../config/constants';
import { PadrinoService } from '../../servicios/padrino.service';
import { EncargadoService } from '../../servicios/encargado.service';

@Component({
  selector: 'app-administradores',
  imports: [CommonModule, FormsModule],
  templateUrl: './administradores.component.html',
  styleUrl: './administradores.component.scss'
})
export class AdministradoresComponent implements OnInit {
  public texts = TEXTOS;
  padrino: any = null;
  encargado: any = null;
  administradores: any[] = [];
  encargadosEnRevision: any[] = [];
  encargadosAprobados: any[] = [];
  
  constructor(
    private router: Router,
    private administradorService: AdministradorService,
    private authService: UserAuthenticationService,
    private padrinoService: PadrinoService,
    private encargadoService: EncargadoService,
  ) {}

  ngOnInit(): void {
    const id = this.authService.getUserId();
    const isPadrino = this.authService.isUserType('padrino');
    const isEncargado = this.authService.isUserType('encargado');
    console.log("Hola");
    if((id === 0 && !isPadrino && !isEncargado) ){
      this.router.navigate(['#']);
    }

    if(isPadrino || isEncargado){
      this.administradorService.getAdministradores().subscribe({
        next: (data) => {
          this.administradores = data;
        },
        error:(err) => {
          console.log('No se pudo obtener a los administradores', err);
        }
      });
      if (isPadrino) {
        console.log("Es padrino");
      this.padrinoService.getPadrinoById(+id).subscribe({
        next: (data) => {
          this.padrino = data;
        },
        error: (err) => {
          console.error('Error al obtener datos del padrino:', err);
        }
      });
    }
    if (isEncargado) {
        console.log("Es encargado");
      this.encargadoService.getEncargadoById(+id).subscribe({
        next: (data) => {
          this.encargado = data;
        },
        error: (err) => {
          console.error('Error al obtener datos del encargado:', err);
        }
      });
    }
    }
  }

  irChat(idAdministrador: any): void{
    localStorage.setItem("idConversacion", idAdministrador.toString());
    localStorage.setItem("tipoConversacion",'administrador');
    this.router.navigate(['/chat']);
  }

  irPerfil(): void {
    if (this.padrino) {
      this.router.navigate(['/perfil-padrino']);
    }
  }

  volver():void{
    window.history.back();
  }

  cerrarSesion(): void {
    this.authService.logout();
  }

  volverAHome():void{
    if (this.padrino) {
      this.router.navigate([`/home-padrino`]);
    }
  }
}
