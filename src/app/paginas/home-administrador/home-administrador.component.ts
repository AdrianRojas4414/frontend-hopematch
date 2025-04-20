import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministradorService } from '../../servicios/administrador.service';
import { RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

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
  private id = 0;
  private userType = 'None';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdministradorService
  ) {}

  ngOnInit(): void {
    const  token = localStorage.getItem('token');
    if(token){
      const decoded = jwtDecode<TokenData>(token);
      this.id = decoded.id;
      this.userType = decoded.UserType;
    }
    if (this.id != 0 && this.userType == 'Admin') {
      this.adminService.getAdministradorById(+this.id).subscribe({
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
    if (this.administrador) {
      this.router.navigate([`/perfil-administrador/${this.administrador.id}`]);
    }
  }

  cerrarSesion(): void {
    this.router.navigate(['/login']);
  }

  irEncargados(): void {
    this.router.navigate(['/admin/encargados']);
  }

  irPadrinos(): void {
    this.router.navigate(['/admin/padrinos']);
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