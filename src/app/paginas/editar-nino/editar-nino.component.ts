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

  validarCampos(): boolean {
    if (!this.nino.ci || !/^[0-9]+$/.test(this.nino.ci)) {
      return false;
    }

    if (!this.nino.nombre || this.nino.nombre.trim().length < 3) {
      return false;
    }

    if (!this.nino.fechaNacimiento) {
      return false;
    }
    const fechaNac = new Date(this.nino.fechaNacimiento);
    const minDate = new Date('2007-01-01');
    const maxDate = new Date('2024-12-31');
    if (fechaNac < minDate || fechaNac > maxDate) {
      return false;
    }

    if (!this.nino.necesidades || this.nino.necesidades.length === 0) {
      return false;
    }

    return true;
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
    if (!this.validarCampos()) {
      alert('Por favor complete todos los campos correctamente');
      return;
    }
    
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

