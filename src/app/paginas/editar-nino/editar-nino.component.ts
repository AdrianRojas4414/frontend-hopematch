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
    this.ninoService.updateNino(this.nino.id, this.nino).subscribe(() => {
      alert('Niño actualizado correctamente');
      localStorage.removeItem("idNino");
      this.router.navigate([`/ninos-hogar`]);
    });
  }

  cancelarEdicion(): void {
    if (this.idEncargado) {
      this.router.navigate([`/ninos-hogar/${this.idEncargado}`]);
    }
  }
}

