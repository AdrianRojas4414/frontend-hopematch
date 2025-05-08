import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministradorService } from '../../servicios/administrador.service';
import { CommonModule } from '@angular/common';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';
import { TEXTOS } from '../../config/constants';

@Component({
  selector: 'app-perfil-administrador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-administrador.component.html',
  styleUrls: ['./perfil-administrador.component.scss']
})
export class PerfilAdministradorComponent implements OnInit {
  public texts = TEXTOS;
  administrador: any = null;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdministradorService,
    private authService: UserAuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.authService.getUserId();
    const isAdministrador = this.authService.isUserType('administrador');

    if (isAdministrador) {
      this.adminService.getAdministradorById(+id).subscribe({
        next: (data) => {
          this.administrador = data;
        },
        error: (err) => {
          console.error('Error al obtener administrador:', err);
        }
      });
    }
  }

  irEditarPerfil(): void {
    if (this.administrador) {
      this.router.navigate([`/editar-perfil-administrador/${this.administrador.id}`]);
    }
  }

  volverAHome(): void {
    this.router.navigate(['/home-administrador']);
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}