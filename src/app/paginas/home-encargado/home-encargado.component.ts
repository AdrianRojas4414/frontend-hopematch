import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EncargadoService } from '../../servicios/encargado.service';
import { jwtDecode } from 'jwt-decode';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';
import { TEXTOS } from '../../config/constants';

@Component({
  selector: 'app-home-encargado',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './home-encargado.component.html',
  styleUrl: './home-encargado.component.scss'
})
export class HomeEncargadoComponent implements OnInit{
  public texts = TEXTOS;
  encargado: any = null;

  constructor(
    private router: Router,
    private encargadoService: EncargadoService,
    private authService: UserAuthenticationService
  ){}

  ngOnInit(): void {
    const id = this.authService.getUserId();
    const isEncargado = this.authService.isUserType('encargado');

    if(id === 0 || !isEncargado){
        this.router.navigate(['#']);
    }

    if (isEncargado) {
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

  cerrarSesion(): void {
    this.authService.logout();
  }

  irPerfil(): void{
    if (this.encargado) {
      this.router.navigate([`/perfil-encargado`]);
    }
  }

  irHogar(): void{
    if (this.encargado) {
      this.router.navigate([`/hogar-encargado`]);
    }
  }

  irDonaciones(): void {
    if (this.encargado) {
        this.router.navigate([`/encargado-donacion`]);
    }
  }

  irNinos(): void {
    if (this.encargado) {
        this.router.navigate([`/ninos-hogar`]);
    }
  }

  irAdministradores(): void{
    this.router.navigate(['/administradores']);
  }
}
