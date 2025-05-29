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
    private router: Router,
    private adminService: AdministradorService,
    private authService: UserAuthenticationService
  ) {}

  ngOnInit(): void {
    const id = this.authService.getUserId();
    const isAdmin = this.authService.isUserType('administrador');

    if(id === 0  || !isAdmin){
      this.router.navigate(['#']);
    }

    if(isAdmin){
      this.adminService.getAdministradorById(+id).subscribe(data => {
        this.administrador = data;
      });
    }
  }

  validarCampos(): boolean {
    if (!this.administrador.nombre || this.administrador.nombre.trim().length < 3) {
      return false;
    }

    if (!this.administrador.contrasenia || this.administrador.contrasenia.length < 8) {
      return false;
    }

    return true;
  }

   private validarCampoRequerido(valor: string, campo: string): boolean {
    if (!valor?.trim()) {
      alert(`El campo ${campo} es obligatorio`);
      return false;
    }
    return true;
  }

  private validarLongitudMinima(valor: string, campo: string, longitud: number): boolean {
    if (valor?.trim().length < longitud) {
      alert(`El campo ${campo} debe tener al menos ${longitud} caracteres`);
      return false;
    }
    return true;
  }

  private validarContrasenia(contrasenia: string): boolean {
    if (contrasenia && contrasenia.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres');
      return false;
    }
    return true;
  }

  private validarFormulario(): boolean {
    return this.validarCampoRequerido(this.administrador.nombre, 'nombre') &&
           this.validarLongitudMinima(this.administrador.nombre, 'nombre', 3) &&
           this.validarContrasenia(this.administrador.contrasenia);
  }

  updateAdministrador(): void {
    if (!this.validarFormulario()) return;

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