import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncargadoService } from '../../servicios/encargado.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { UserAuthenticationService } from '../../servicios/user-authentication.service';

@Component({
  selector: 'app-editar-encargado',
  standalone: true, 
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-encargado.component.html',
  styleUrl: './editar-encargado.component.scss'
})
export class EditarEncargadoComponent implements OnInit {
  encargado: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private encargadoService: EncargadoService,
    private authService: UserAuthenticationService
  ) {}

  ngOnInit(): void {
    const id = this.authService.getUserId();
    const isEncargado = this.authService.isUserType('encargado');

    if(isEncargado){
      this.encargadoService.getEncargadoById(id).subscribe(data => {
      this.encargado = data;
    });
    }
  }

  
  validarCampos(): boolean {
    if (!this.encargado.nombre || this.encargado.nombre.trim().length < 3) {
      return false;
    }

    if (!this.encargado.celular || !/^\d{8}$/.test(this.encargado.celular)) {
      return false;
    }

    if (!this.encargado.direccion_hogar || !this.encargado.direccion_hogar.trim()) {
      return false;
    }

    if (!this.encargado.descripcion || this.encargado.descripcion.trim().length < 20) {
      return false;
    }

    if (this.encargado.contrasenia && this.encargado.contrasenia.length < 8) {
      return false;
    }

    return true;
  }


  updateEncargado(): void {
    if (!this.validarCampos()) {
      alert('Por favor complete todos los campos correctamente');
      return;
    }

    this.encargadoService.updateEncargado(this.encargado.id, this.encargado)
      .subscribe({
        next: () => {
          alert('Encargado actualizado correctamente');
          window.history.back();
        },
        error: (err) => {
          console.error('Error al actualizar encargado:', err);
          alert('Error al actualizar el perfil');
        }
      });
  }

  eliminarEncargado(): void{
    if(confirm('¿Estas seguro que deseas eliminar la cuenta?')){
      this.encargado.estado = "En suspencion";
      this.encargadoService.updateEncargado(this.encargado.id, this.encargado)
      .subscribe(()=> {
        alert('La cuenta se encuentra en un estado de suspencion. Sus datos seran eliminados por completo dentro de 6 meses');
        this.authService.logout();
        console.log(this.encargado)
        window.history.back();
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 500);
      })
    }
  }
}
