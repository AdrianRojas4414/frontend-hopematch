import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PadrinoService } from '../../servicios/padrino.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';
import { TEXTOS } from '../../config/constants';

@Component({
  selector: 'app-editar-padrino',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-padrino.component.html',
  styleUrl: './editar-padrino.component.scss'
})
export class EditarPadrinoComponent implements OnInit {
  
  public texts = TEXTOS;
  padrino: any = {}; 
  nuevaContrasenia: string = '';
  mostrarContrasenia: boolean = false;

  constructor(
    private router: Router,
    private padrinoService: PadrinoService,
    private authService: UserAuthenticationService
  ) {}

  ngOnInit(): void {
    const id = this.authService.getUserId();
    const isPadrino = this.authService.isUserType('padrino');

    if(id === 0  || !isPadrino){
      this.router.navigate(['#']);
    }

    if(isPadrino){
      this.padrinoService.getPadrinoById(id).subscribe(data => {
      this.padrino = data;
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
    return this.validarCampoRequerido(this.padrino.nombre, 'nombre') &&
           this.validarLongitudMinima(this.padrino.nombre, 'nombre', 3) &&
           this.validarCampoRequerido(this.padrino.celular, 'celular') &&
           this.validarCelular(this.padrino.celular) &&
           this.validarContrasenia(this.padrino.contrasenia);
  }

  updatePadrino(): void {
    if (this.nuevaContrasenia) {
      this.padrino.contrasenia = this.nuevaContrasenia;
    } else {
      delete this.padrino.contrasenia;
    }

    if (!this.validarFormulario()) return;
    
    this.padrinoService.updatePadrino(this.padrino.id, this.padrino)
      .subscribe({
        next: () => {
          alert('Padrino actualizado correctamente');
          this.router.navigate([`/perfil-padrino`]);
        },
        error: (err) => {
          console.error('Error al actualizar padrino:', err);
          alert('Error al actualizar el perfil');
        }
      });
  }

  eliminarPadrino(): void{
    if(confirm('¿Estas seguro que deseas eliminar la cuenta?')){
      this.padrino.estado = "Suspendido";
      delete this.padrino.contrasenia;
      this.padrinoService.updatePadrino(this.padrino.id, this.padrino)
      .subscribe(()=> {
        alert("Su cuenta se encuentra SUSPENDIDA, por favor contáctese con Soporte Técnico.");
        this.authService.logout();
        console.log(this.padrino)
        this.router.navigate([`/perfil-padrino`]);
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 500);
      })
    }
  }

  cancelarEdicion(): void {
    this.router.navigate(['/perfil-padrino']);
  }
}