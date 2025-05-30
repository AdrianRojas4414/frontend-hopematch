import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DonacionService } from '../../servicios/donacion.service';
import { NinoService } from '../../servicios/nino.service';
import { TEXTOS } from '../../config/constants';
import {MatRadioModule} from '@angular/material/radio';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registro-donacion',
  standalone: true,
  imports: [FormsModule, CommonModule, MatRadioModule],
  templateUrl: './registro-donacion.component.html',
  styleUrls: ['./registro-donacion.component.scss']
})
export class RegistroDonacionComponent implements OnInit {
  public texts = TEXTOS;
  donacion = {
    padrino_id: null as number | null,
    encargado_id: null as number | null,
    cantidad_donacion: null as number | null,
    fecha_donacion: new Date().toISOString().split('T')[0],
    foto_donacion: '',
    necesidades: [] as number[]
  };

  necesidades: any[] = [];
  isLoading = false;

  constructor(
    private donacionService: DonacionService,
    private ninoService: NinoService,
    private router: Router,
    private authService: UserAuthenticationService,
    public dialogRef: MatDialogRef<RegistroDonacionComponent>,
  ) {}

  ngOnInit(): void {
    const padrinoId = localStorage.getItem('padrinoId');
    const encargadoId = localStorage.getItem('encargadoId');

    const id = this.authService.getUserId();
    const isPadrino= this.authService.isUserType('padrino');

    if(id === 0  || !isPadrino){
      this.router.navigate(['#']);
    }

    if(isPadrino){
      if (padrinoId && encargadoId) {
        this.donacion.padrino_id = +padrinoId;
        this.donacion.encargado_id = +encargadoId;
      }
      else{
        console.log("No se encontro el padrino id o encargado id");
      }
      this.cargarNecesidades();
    }
  }

  cargarNecesidades(): void {
    if (!this.donacion.encargado_id) return;
    
    this.isLoading = true;
    this.ninoService.getNecesidadesByEncargado(this.donacion.encargado_id).subscribe({
        next: (necesidades: string[]) => {
            console.log("Necesidades ordenadas del hogar:", necesidades);
            this.necesidades = necesidades.map((necesidad, index) => ({
                id: index + 1,
                nombre: necesidad
            }));
            this.isLoading = false;
        },
        error: () => this.isLoading = false
    });

  }

  toggleNecesidad(necesidadId: number) {
    const index = this.donacion.necesidades.indexOf(necesidadId);
    if (index === -1) {
      this.donacion.necesidades.push(necesidadId);
    } else {
      this.donacion.necesidades.splice(index, 1);
    }
  }
  seleccionarNecesidad(necesidadId: number) {
    this.donacion.necesidades = [necesidadId]; 
  }

  registrarDonacion() {
    const necesidadesSeleccionadas = this.necesidades
        .filter(necesidad => this.donacion.necesidades.includes(necesidad.id))
        .map(necesidad => necesidad.nombre);

    const donacionData = {
      padrino: { id: this.donacion.padrino_id },
      encargado: { id: this.donacion.encargado_id },
      cantidadDonacion: this.donacion.cantidad_donacion,
      fechaDonacion: this.donacion.fecha_donacion,
      fotoDonacion: this.donacion.foto_donacion || '',
      necesidadesSeleccionadas: necesidadesSeleccionadas.join(', ')
    };

    this.donacionService.registrarDonacion(donacionData).subscribe({
      next: (response) => {
        console.log('Donación registrada:', response);
        alert('Donación registrada con éxito');
        localStorage.removeItem("padrinoId");
        localStorage.removeItem("encargadoId");
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/home-padrino']);
        });
      },
      error: (error) => {
        console.error('Error al registrar donación:', error);
        alert('Error al registrar donación: ' + (error.error?.message || error.message));
      }
    });
    this.dialogRef.close();
  }
  cancelar(): void {
    localStorage.removeItem("padrinoId");
    localStorage.removeItem("encargadoId");
    this.dialogRef.close();
  }
}