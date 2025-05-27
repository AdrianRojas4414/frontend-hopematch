import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministradorService } from '../../servicios/administrador.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';

@Component({
  selector: 'app-editar-administrador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-administrador.component.html',
  styleUrls: ['./editar-administrador.component.scss']
})
export class EditarAdministradorComponent implements OnInit {
  administrador: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdministradorService,
    private authService: UserAuthenticationService
  ) {}

  ngOnInit(): void {
    const id = this.authService.getUserId();

    this.adminService.getAdministradorById(+id).subscribe(data => {
      this.administrador = data;
    });
  }

  updateAdministrador(): void {
    this.adminService.updateAdministrador(this.administrador.id, this.administrador)
      .subscribe({
        next: () => {
          alert('Administrador actualizado correctamente');
          this.router.navigate([`/perfil-administrador`]);
        },
        error: (err) => {
          console.error('Error al actualizar administrador:', err);
          alert('Error al actualizar el perfil');
        }
      });
  }

  cancelarEdicion(): void {
    this.router.navigate([`/perfil-administrador`]);
  }
}