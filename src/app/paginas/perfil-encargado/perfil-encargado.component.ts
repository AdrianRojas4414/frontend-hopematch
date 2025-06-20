import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EncargadoService } from '../../servicios/encargado.service';
import { CommonModule } from '@angular/common';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';
import { TEXTOS } from '../../config/constants';

@Component({
  selector: 'app-perfil-encargado',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './perfil-encargado.component.html',
  styleUrl: './perfil-encargado.component.scss'
})

export class PerfilEncargadoComponent implements OnInit{
  public texts = TEXTOS;
  encargado: any = null;
  mostrarBotonEditar: boolean = true;

  constructor(
    private encargadoService: EncargadoService, 
    private router: Router, 
    private authService: UserAuthenticationService
  ){}

  ngOnInit(): void {
    const id = this.authService.getUserId();
    const isEncargado = this.authService.isUserType('encargado');
    const idEncargado_gestion = localStorage.getItem('idEncargado_gestion');

    if(id === 0){
      this.router.navigate(['#']);
    }

    if (id || idEncargado_gestion) {
      if(!isEncargado && idEncargado_gestion){
        this.mostrarBotonEditar = false;
        this.encargadoService.getEncargadoById(+idEncargado_gestion).subscribe({
          next: (data) => {
            this.encargado = data;
          },
          error:(err) => {
            console.error('Error al obtener encargado:', err);
          }
        })
      }
      else{
        this.encargadoService.getEncargadoById(+id).subscribe({
          next: (data) => {
            this.encargado = data;
          },
          error: (err) => {
            console.error('Error al obtener encargado:', err);
          }
        });
      }
    }
  }

  cerrarSesion(): void {
    localStorage.removeItem("idEncargado_gestion");
    this.authService.logout();
  }

  irNinos(): void {
    if (this.encargado) {
      this.router.navigate([`/ninos-hogar`]);
    }
  }

  irEditarPerfil(): void{
    if (this.encargado) {
      this.router.navigate([`/editar-perfil-encargado`]);
    }
  }

  VolverAHome():void{
    this.router.navigate([`/home-encargado`]);
  }

  irAdministradores(): void{
    this.router.navigate(['/administradores']);
  }

  VolverAHomeAdmin(){
    localStorage.removeItem("idEncargado_gestion");
    window.history.back();
  }
  
}
