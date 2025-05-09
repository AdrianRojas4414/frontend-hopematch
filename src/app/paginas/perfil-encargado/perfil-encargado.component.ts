import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EncargadoService } from '../../servicios/encargado.service';
import { CommonModule } from '@angular/common';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';

@Component({
  selector: 'app-perfil-encargado',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './perfil-encargado.component.html',
  styleUrl: './perfil-encargado.component.scss'
})
export class PerfilEncargadoComponent implements OnInit{

  encargado: any = null;
  mostrarBotonEditar: boolean = false;

  constructor(private route: ActivatedRoute, private encargadoService: EncargadoService, private router: Router, private authService: UserAuthenticationService){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const idEncargadoLogueado = this.authService.getUserId();

    if (id) {
      this.encargadoService.getEncargadoById(+id).subscribe({
        next: (data) => {
          this.encargado = data;
          this.mostrarBotonEditar = +id === idEncargadoLogueado && this.authService.isUserType('encargado');
        },
        error: (err) => {
          console.error('Error al obtener encargado:', err);
        }
      });
    }
  }

  irCrearNino(): void {
    if (this.encargado) {
      this.router.navigate([`/crear-nino/${this.encargado.id}`]);
    }
  }

  irEditarPerfil(): void{
    if (this.encargado) {
      this.router.navigate([`/editar-perfil-encargado/${this.encargado.id}`]);
    }
  }

  /*editarNino(id: number): void {
    this.router.navigate([`/editar-nino/${id}`]);
  }*/

  editarNino(idNino: number, idEncargado: number): void {
    this.router.navigate([`/editar-nino/${idNino}`], { queryParams: { encargado: idEncargado } });
  }

  VolverAHome():void{
    if (this.encargado) {
      this.router.navigate([`/home-encargado`]);
    }
  }
  
}
