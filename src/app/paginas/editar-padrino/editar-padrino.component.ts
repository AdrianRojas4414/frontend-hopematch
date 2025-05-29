import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PadrinoService } from '../../servicios/padrino.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';

@Component({
  selector: 'app-editar-padrino',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-padrino.component.html',
  styleUrl: './editar-padrino.component.scss'
})
export class EditarPadrinoComponent implements OnInit {
  padrino: any = {}; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private padrinoService: PadrinoService,
    private authService: UserAuthenticationService
  ) {}

  ngOnInit(): void {
    const id = this.authService.getUserId();
    const isPadrino = this.authService.isUserType('padrino');

    if(isPadrino){
      this.padrinoService.getPadrinoById(id).subscribe(data => {
      this.padrino = data;
    });
    }
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
      this.padrino.estado = "En suspencion";
      this.padrinoService.updatePadrino(this.padrino.id, this.padrino)
      .subscribe(()=> {
        alert('La cuenta se encuentra en un estado de suspencion. Sus datos seran eliminados por completo dentro de 6 meses');
        this.authService.logout();
        console.log(this.padrino)
        this.router.navigate([`/perfil-padrino`]);
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 500);
      })
    }
  }
}