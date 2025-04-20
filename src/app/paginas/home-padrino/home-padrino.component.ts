import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PadrinoService } from '../../servicios/padrino.service';
import { EncargadoService } from '../../servicios/encargado.service';
import { DonacionService } from '../../servicios/donacion.service';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';
import { NinoService } from '../../servicios/nino.service';

@Component({
  selector: 'app-home-padrino',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './home-padrino.component.html',
  styleUrl: './home-padrino.component.scss'
})
export class HomePadrinoComponent implements OnInit {

  padrino: any = null;
  encargados: any[] = [];
  donaciones: any[] = [];
  necesidades: any[] = [];
  busqueda: string = '';

  constructor(
    private route: ActivatedRoute,
    private padrinoService: PadrinoService,
    private router: Router,
    private encargadoService: EncargadoService,
    private donacionService: DonacionService,
    private authService: UserAuthenticationService,
    private ninoService: NinoService
  ) {}

  ngOnInit(): void {
      const id = this.authService.getUserId();
      const isPadrino = this.authService.isUserType('padrino');

      if (isPadrino) {
      this.padrinoService.getPadrinoById(+id).subscribe({
        next: (data) => {
          this.padrino = data;
          this.obtenerDonaciones(this.padrino.id);
        },
        error: (err) => {
          console.error('Error al obtener encargado:', err);
        }
      });
      this.obtenerEncargados();
    }
  }

  obtenerEncargados(): void {
    this.encargadoService.getEncargados().subscribe(
      data => {
        this.encargados = data,
        this.encargados.forEach(encargado => this.getEncargadoNecesidades(encargado));
      },
        
      error => console.log(error),
      () => console.log('Encargados Obtenidos Exitosamente!')
    );
  }

  obtenerDonaciones(padrinoId: number): void {
    this.donacionService.getDonacionesByPadrino(padrinoId).subscribe({
      next: (data) => {
        this.donaciones = data;
      },
      error: (err) => {
        console.error('Error al obtener donaciones:', err);
      }
    });
  }

  getEncargadoName(encargadoId: number): string {
    const encargado = this.encargados.find(e => e.id === encargadoId);
    return encargado ? encargado.nombre_hogar : 'Encargado desconocido';
  }

  getEncargadoNecesidades(encargado: any){
    this.ninoService.getNecesidadesByEncargado(encargado.id).subscribe({
        next: (necesidades: string[]) => {
            console.log("Necesidades ordenadas del hogar:", necesidades);
            encargado.necesidades = necesidades.map((necesidad, index) => ({
                id: index + 1,
                nombre: necesidad
            }));
        },
        error: (err) => {
          console.error('Error al obtener necesidades:', err);
        }
    });
  }

  getNecesidadesAsString(encargado: any): string {
    if (encargado.necesidades && encargado.necesidades.length) {
      return encargado.necesidades.map((necesidad:any) => necesidad.nombre).join(', ');
    }
    return 'No hay necesidades registradas.';
  }

  haDonadoA(encargadoId: number): boolean {
    return this.donaciones.some(donacion => donacion.encargado.id === encargadoId);
  }

  irPerfil(): void {
    if (this.padrino) {
      this.router.navigate(['/perfil-padrino']);
    }
  }

  verHogar(idHogar: number): void {
    this.router.navigate([`/detalle-hogar/${idHogar}`]);
  }

  verDetallesDonacion(donacionId: number): void {
    this.router.navigate([`/detalle-donacion/${donacionId}`]);
  }

  irARegistroDonacion(padrinoId: number, encargadoId: number): void {
    this.router.navigate(['/registro-donacion', padrinoId, encargadoId]);
  }

  encargadosFiltrados(): any[] {
    if (!this.busqueda.trim()) {
      return this.encargados;
    }

    const texto = this.busqueda.toLowerCase();
    return this.encargados.filter(encargado =>
      encargado.nombre_hogar.toLowerCase().startsWith(texto)
    );
  }
}
