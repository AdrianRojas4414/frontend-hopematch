import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EncargadoService } from '../../servicios/encargado.service';
import { CommonModule } from '@angular/common';
import { NinoService } from '../../servicios/nino.service';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';
import { TEXTOS } from '../../config/constants';

@Component({
  selector: 'app-hogar-encargado',
  imports: [RouterLink, CommonModule],
  templateUrl: './hogar-encargado.component.html',
  styleUrl: './hogar-encargado.component.scss'
})
export class HogarEncargadoComponent implements OnInit{
  public texts = TEXTOS;
  encargado: any = null
  necesidades: any[] = [];
  isLoading = false;

  constructor(
    private encargadoService: EncargadoService, 
    private router: Router, 
    private ninoService: NinoService, 
    private authService: UserAuthenticationService
  ){}

  ngOnInit(): void {
    const id = this.authService.getUserId();
    const isEncargado = this.authService.isUserType('encargado');

    if(id === 0  || !isEncargado){
      this.router.navigate(['#']);
    }

    if (isEncargado) {
      this.encargadoService.getEncargadoById(+id).subscribe({
        next: (data) => {
          this.encargado = data;
          console.log(data)
          this.cargarNecesidades();
        },
        error: (err) => {
          console.error('Error al obtener encargado:', err);
        }
      });
    }
  }

  volverHome(): void {
    this.router.navigate(['/home-encargado']);
  }

  cerrarSesion(): void {
    this.authService.logout();
  }

  cargarNecesidades(): void {
    this.isLoading = true;
    console.log(this.encargado.id)
    this.ninoService.getNecesidadesByEncargado(this.encargado.id).subscribe({
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
    const index = this.necesidades.indexOf(necesidadId);
    if (index === -1) {
      this.necesidades.push(necesidadId);
    } else {
      this.necesidades.splice(index, 1);
    }
  }
  seleccionarNecesidad(necesidadId: number) {
    this.necesidades = [necesidadId]; 
  }

  irEditarPerfil(): void{
    console.log("irse");
    if (this.encargado) {
      this.router.navigate([`/editar-perfil-encargado`]);
    }
  }

  irMisNinos(): void{
    if (this.encargado) {
      this.router.navigate([`/ninos-hogar`]);
    }
  }
  irPerfil(): void {
    if (this.encargado) {
      this.router.navigate(['/perfil-encargado']);
    }
  }

  irAdministradores(): void{
    this.router.navigate(['/administradores']);
  }
}
