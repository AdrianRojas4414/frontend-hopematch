import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdministradorService } from '../../servicios/administrador.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';

@Component({
  selector: 'app-administradores',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './administradores.component.html',
  styleUrl: './administradores.component.scss'
})
export class AdministradoresComponent implements OnInit {
  administradores: any[] = [];
  encargadosEnRevision: any[] = [];
  encargadosAprobados: any[] = [];
  
  constructor(
    private router: Router,
    private administradorService: AdministradorService,
    private authService: UserAuthenticationService
  ) {}

  ngOnInit(): void {
    const id = this.authService.getUserId();
    const isPadrino = this.authService.isUserType('padrino');
    const isEncargado = this.authService.isUserType('encargado');

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
    }
  }

  irChat(idAdministrador: any): void{
    localStorage.setItem("idConversacion", idAdministrador.toString());
    localStorage.setItem("tipoConversacion",'administrador');
    this.router.navigate(['/chat']);
  }

  Volver():void{
    window.history.back();
  }

}
