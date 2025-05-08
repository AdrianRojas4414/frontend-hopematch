import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministradorService } from '../../servicios/administrador.service';
import { RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';

interface TokenData {
  sub: string;
  id: number;
  UserType: string;
  exp: number;
}

@Component({
  selector: 'app-home-administrador',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home-administrador.component.html',
  styleUrls: ['./home-administrador.component.scss']
})
export class HomeAdministradorComponent implements OnInit {
  administrador: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdministradorService,
    private authService: UserAuthenticationService
  ) {}

  ngOnInit(): void {
    const id = this.authService.getUserId();
    const isAdministrador = this.authService.isUserType("administrador");
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

  irPerfil(): void {
    const id = this.authService.getUserId();
    this.router.navigate([`/perfil-administrador/${id}`]);
  }

  cerrarSesion(): void {
    this.router.navigate(['/login']);
  }

  irEncargados(): void {
    this.router.navigate(['/gestion-hogares']);
  }

  irPadrinos(): void {
    this.router.navigate(['/gestion-padrinos']);
  }

  irNinos(): void {
    this.router.navigate(['/admin/ninos']);
  }

  irAgenda(): void {
    this.router.navigate(['/admin/agenda']);
  }

  irContactos(): void {
    this.router.navigate(['/admin/contactos']);
  }
}