import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncargadoService } from '../../servicios/encargado.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { UserAuthenticationService } from '../../servicios/user-authentication.service';
import { TEXTOS } from '../../config/constants';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-encargado',
  standalone: true, 
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-encargado.component.html',
  styleUrl: './editar-encargado.component.scss'
})
export class EditarEncargadoComponent implements OnInit {
  public texts = TEXTOS;
  encargado: any = {};
  nuevaContrasenia: string = '';
  mostrarContrasenia: boolean = false;

  constructor(
    private router: Router,
    private encargadoService: EncargadoService,
    private authService: UserAuthenticationService,
    public dialogRef: MatDialogRef<EditarEncargadoComponent>,
  ) {}

  ngOnInit(): void {
    const id = this.authService.getUserId();
    const isEncargado = this.authService.isUserType('encargado');

    if(id === 0  || !isEncargado){
      this.router.navigate(['#']);
    }

    if(isEncargado){
      this.encargadoService.getEncargadoById(id).subscribe(data => {
      this.encargado = data;
    });
    }
  }

  private validarCampoRequerido(valor: string, campo: string): boolean {
    if (!String(valor)?.trim()) {
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

  private validarCelular(celular: string): boolean {
    if (!/^\d{8}$/.test(celular)) {
      alert('El celular debe tener exactamente 8 dígitos');
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
    return this.validarCampoRequerido(this.encargado.nombre, 'nombre') &&
           this.validarLongitudMinima(this.encargado.nombre, 'nombre', 3) &&
           this.validarCampoRequerido(this.encargado.celular, 'celular') &&
           this.validarCelular(this.encargado.celular) &&
           this.validarCampoRequerido(this.encargado.direccion_hogar, 'dirección del hogar') &&
           this.validarCampoRequerido(this.encargado.descripcion, 'descripción') &&
           this.validarLongitudMinima(this.encargado.descripcion, 'descripción', 20) &&
           this.validarContrasenia(this.encargado.contrasenia);
  }

  updateEncargado(): void {
    if (this.nuevaContrasenia) {
      this.encargado.contrasenia = this.nuevaContrasenia;
    } else {
      delete this.encargado.contrasenia;
    }

    if (!this.validarFormulario()) return;

    const currentUrl = this.router.url;
    
    this.encargadoService.updateEncargado(this.encargado.id, this.encargado)
      .subscribe({
        next: () => {
          alert('Encargado actualizado correctamente');
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
          });
        },
        error: (err) => {
          console.error('Error al actualizar encargado:', err);
          alert('Error al actualizar el perfil');
        }
      });
      this.dialogRef.close();
  }

  eliminarEncargado(): void{
    if(confirm('¿Estas seguro que deseas eliminar la cuenta?')){
      this.encargado.estado = "Suspendido";
      delete this.encargado.contrasenia;
      this.encargadoService.updateEncargado(this.encargado.id, this.encargado)
      .subscribe(()=> {
        alert("Su cuenta se encuentra SUSPENDIDA, por favor contáctese con Soporte Técnico.");
        this.authService.logout();
        console.log(this.encargado)
        window.history.back();
        this.dialogRef.close();
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 500);
      })
    }
  }
  
  cancelarEdicion(): void {
    this.dialogRef.close();
  }
}
