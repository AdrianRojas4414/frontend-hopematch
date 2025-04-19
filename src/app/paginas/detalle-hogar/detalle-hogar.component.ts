import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EncargadoService } from '../../servicios/encargado.service';
import { DonacionService } from '../../servicios/donacion.service';

@Component({
  selector: 'app-detalle-hogar',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './detalle-hogar.component.html',
  styleUrl: './detalle-hogar.component.scss'
})
export class DetalleHogarComponent implements OnInit{

  encargado: any = null;
  donaciones: any[] = [];
  donacionActual: any = null;
  indiceDonacionActual: number = 0;
  nino: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private encargadoService: EncargadoService,
    private donacionService: DonacionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.encargadoService.getEncargadoById(+id).subscribe({
        next: (data) => {
          this.encargado = data;
          this.cargarDonaciones(+id);
        },
        error: (err) => {
          console.error('Error al obtener hogar:', err);
        }
      });
    }
  }

  cargarDonaciones(encargadoId: number): void {
    this.donacionService.getDonacionesByEncargado(encargadoId).subscribe({
      next: (data) => {
        this.donaciones = data;
        if (this.donaciones.length > 0) {
          this.donacionActual = this.donaciones[0];
          this.indiceDonacionActual = 0;
        }
      },
      error: (err) => {
        console.error('Error al obtener donaciones:', err);
      }
    });
  }

  anteriorDonacion(): void {
    if (this.donaciones.length > 0) {
      this.indiceDonacionActual = (this.indiceDonacionActual - 1 + this.donaciones.length) % this.donaciones.length;
      this.donacionActual = this.donaciones[this.indiceDonacionActual];
    }
  }

  siguienteDonacion(): void {
    if (this.donaciones.length > 0) {
      this.indiceDonacionActual = (this.indiceDonacionActual + 1) % this.donaciones.length;
      this.donacionActual = this.donaciones[this.indiceDonacionActual];
    }
  }

  obtenerNecesidadesUnicas(): string[] {
    const necesidades = new Set<string>();

    this.encargado?.ninos?.forEach((nino:any) => {
      nino.necesidades.forEach((necesidad:any) => necesidades.add(necesidad));
    });

    return Array.from(necesidades);
  }

  volverAtras() {
    window.history.back();
  }
}
