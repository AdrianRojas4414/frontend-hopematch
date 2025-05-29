import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NinoService } from '../../servicios/nino.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { UserAuthenticationService } from '../../servicios/user-authentication.service';

@Component({
  selector: 'app-editar-nino',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-nino.component.html',
  styleUrl: './editar-nino.component.scss'
})
export class EditarNinoComponent {
  nino: any = { necesidades: [] };
  idEncargado: number | null = null;
  nuevaNecesidad: string = ''; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ninoService: NinoService,
    private authService: UserAuthenticationService
  ) {}

  ngOnInit(): void {
    const id = localStorage.getItem('idNino');
    this.idEncargado = this.authService.getUserId();

    if(id){
      this.ninoService.getNinoById(+id).subscribe((data: any) => {
        this.nino = data;
        if (!this.nino.necesidades) {
          this.nino.necesidades = []; 
        }
      });
    }
  }

  
  private validarCampoRequerido(valor: any, campo: string): boolean {
    if (!valor && valor !== 0) {
      alert(`El campo ${campo} es obligatorio`);
      return false;
    }
    return true;
  }

  private validarSoloNumeros(valor: string, campo: string): boolean {
    if (!/^[0-9]+$/.test(valor)) {
      alert(`El campo ${campo} debe contener solo números`);
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

  private validarFechaNacimiento(fecha: string): boolean {
    const fechaNac = new Date(fecha);
    const minDate = new Date('2007-01-01');
    const maxDate = new Date('2024-12-31');
    
    if (fechaNac < minDate || fechaNac > maxDate) {
      alert('La fecha de nacimiento debe estar entre 2007-2024 (1-18 años)');
      return false;
    }
    return true;
  }

  private validarNecesidades(necesidades: any[]): boolean {
    if (!necesidades || necesidades.length === 0) {
      alert('Debe agregar al menos una necesidad');
      return false;
    }
    return true;
  }

  private validarFormulario(): boolean {
    return this.validarCampoRequerido(this.nino.ci, 'CI') &&
           this.validarSoloNumeros(this.nino.ci, 'CI') &&
           this.validarCampoRequerido(this.nino.nombre, 'nombre') &&
           this.validarLongitudMinima(this.nino.nombre, 'nombre', 3) &&
           this.validarCampoRequerido(this.nino.fechaNacimiento, 'fecha de nacimiento') &&
           this.validarFechaNacimiento(this.nino.fechaNacimiento) &&
           this.validarNecesidades(this.nino.necesidades);
  }

  agregarNecesidad(): void {
    if (this.nuevaNecesidad.trim()) {
      this.nino.necesidades.push(this.nuevaNecesidad.trim());
      this.nuevaNecesidad = '';
    }
  }

  eliminarNecesidad(index: number): void {
    this.nino.necesidades.splice(index, 1);
  }

  updateNino(): void {
    if (!this.validarFormulario()) return;
    
    this.ninoService.updateNino(this.nino.id, this.nino).subscribe({
      next: () => {
        alert('Niño actualizado correctamente');
        localStorage.removeItem("idNino");
        this.router.navigate([`/ninos-hogar`]);
      },
      error: (err) => {
        console.error('Error al actualizar niño:', err);
        alert('Error al actualizar el niño');
      }
    });
  }
}

