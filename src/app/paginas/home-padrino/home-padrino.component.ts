import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PadrinoService } from '../../servicios/padrino.service';
import { EncargadoService } from '../../servicios/encargado.service';
import { DonacionService } from '../../servicios/donacion.service';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';
import { NinoService } from '../../servicios/nino.service';
import { TEXTOS } from '../../config/constants';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DetalleDonacionComponent } from '../detalle-donacion/detalle-donacion.component';
import { RegistroDonacionComponent } from '../registro-donacion/registro-donacion.component';

@Component({
  selector: 'app-home-padrino',
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './home-padrino.component.html',
  styleUrl: './home-padrino.component.scss'
})
export class HomePadrinoComponent implements OnInit {
  public texts = TEXTOS;

  padrino: any = null;
  encargados: any[] = [];
  encargadosAprobados: any[] = [];
  donaciones: any[] = [];
  necesidades: any[] = [];
  busqueda: string = '';

  constructor(
    private padrinoService: PadrinoService,
    private router: Router,
    private encargadoService: EncargadoService,
    private donacionService: DonacionService,
    private authService: UserAuthenticationService,
    private ninoService: NinoService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = this.authService.getUserId();
    const isPadrino = this.authService.isUserType('padrino');

    if(id === 0 || !isPadrino){
      this.router.navigate(['#']);
    }

    if (isPadrino) {
      this.padrinoService.getPadrinoById(+id).subscribe({
        next: (data) => {
          this.padrino = data;
          this.obtenerDonaciones(this.padrino.id);
        },
        error: (err) => {
          console.error('Error al obtener datos del padrino:', err);
        }
      });
      this.obtenerEncargados();
    }
  }

  cerrarSesion(): void {
    this.authService.logout();
  } 

  obtenerEncargados(): void {
    this.encargadoService.getEncargados().subscribe({
      next: (data) => {
        this.encargados = data,
        this.encargadosAprobados = data.filter((e: any) => e.estado === 'Aprobado');
        this.encargadosAprobados.forEach(encargado => this.getEncargadoNecesidades(encargado));
      },
      error:(err) =>{
        console.log('Error al obtener los encargados', err);
      } 
    });
  }

  obtenerDonaciones(padrinoId: number): void {
      this.donacionService.getDonacionesByPadrino(padrinoId).subscribe({
        next: (data) => {
          // Ordena por id_donacion (el número más alto primero)
          this.donaciones = data.sort((a, b) => b.id - a.id);
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
    return 'Las necesidades aún no fueron registradas.';
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
    localStorage.setItem("idHogar", idHogar.toString());
    this.router.navigate([`/detalle-hogar`]);
  }

  irARegistroDonacion(padrinoId: number, encargadoId: number): void {
    localStorage.setItem("padrinoId", padrinoId.toString());
    localStorage.setItem("encargadoId", encargadoId.toString());
    const dialogRef = this.dialog.open(RegistroDonacionComponent, {
      width: '500px',
      height: 'fit-content'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.obtenerDonaciones(this.padrino.id);
      }
    });
  }

  encargadosFiltrados(): any[] {
    if (!this.busqueda.trim()) {
      return this.encargadosAprobados;
    }

    const palabrasBusqueda = this.busqueda.toLowerCase().split(/\s+/);

    return this.encargadosAprobados.filter(encargado => {
      const nombreHogar = encargado.nombre_hogar.toLowerCase();
      return palabrasBusqueda.some(palabra => nombreHogar.includes(palabra));
    });
  }

  irAdministradores(): void{
    this.router.navigate(['/administradores']);
  }

  abrirDetallesDialogo(donacionId: number): void {
    localStorage.setItem("donacionId", donacionId.toString());
    const dialogRef = this.dialog.open(DetalleDonacionComponent, {
      width: '500px',
      height: 'fit-content',
      data: donacionId
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró');
    });
  }
}
