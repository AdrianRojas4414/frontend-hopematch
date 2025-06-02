import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EncargadoService } from '../../servicios/encargado.service';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';
import { TEXTOS } from '../../config/constants';

@Component({
  selector: 'app-gestion-hogares',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './gestion-hogares.component.html',
  styleUrl: './gestion-hogares.component.scss'
})
export class GestionHogaresComponent implements OnInit{

  public texts = TEXTOS;
  encargados: any[] = [];
  encargadosEnRevision: any[] = [];
  encargadosAprobados: any[] = [];

  constructor(
    private router: Router,
    private encargadoService: EncargadoService,
    private authService: UserAuthenticationService
  ) {}

  ngOnInit(): void {
    const id = this.authService.getUserId();
    const isAdmin= this.authService.isUserType('administrador');

    if(id === 0  || !isAdmin){
      this.router.navigate(['#']);
    }

    if(isAdmin){
      this.encargadoService.getEncargados().subscribe(
        data => {
          this.encargados = data;
          this.encargadosEnRevision = data.filter((e: any) => e.estado === 'En revision');
          this.encargadosAprobados = data.filter((e: any) => e.estado === 'Aprobado');
        },
        error => console.log(error),
      );
    }
  }

  cerrarSesion(): void {
    this.authService.logout();
  }

  getNecesidadesAsString(encargado: any): string {
    if (encargado.necesidades && encargado.necesidades.length) {
      return encargado.necesidades.map((necesidad:any) => necesidad.nombre).join(', ');
    }
    return 'No hay necesidades registradas.';
  }

  verDetalles(idEncargado: number): void{
    localStorage.setItem("idEncargado_gestion", idEncargado.toString());
    this.router.navigate([`/perfil-encargado`]);
  }

  aprobarHogar(encargado: any):void{
    encargado.estado = "Aprobado";
    delete encargado.contrasenia;
    this.encargadoService.updateEncargado(encargado.id, encargado).subscribe(()=>{
      alert('El Hogar ha sido aprobado y puede recibir donaciones');
      this.ngOnInit();
    })
  }

  rechazarHogar(encargado: any):void{
    encargado.estado = "Suspendido";
    delete encargado.contrasenia;
    this.encargadoService.updateEncargado(encargado.id, encargado).subscribe(()=>{
      alert('El Hogar fue Suspendido, puede ver los Hogares Suspendidos en el apartado "Hogares Suspendidos"');
      this.ngOnInit();
    })
  }

  suspenderHogar(encargado: any):void{
    encargado.estado = "Suspendido";
    delete encargado.contrasenia;
    this.encargadoService.updateEncargado(encargado.id, encargado).subscribe(()=>{
      alert('El Hogar fue Suspendido, puede ver los Hogares Suspendidos en el apartado "Hogares Suspendidos"');
      this.ngOnInit();
    })
  }

  irHogaresSuspendidos(): void {
    this.router.navigate(['/hogares-suspendidos']);
  }

  volverHome(){
    this.router.navigate(['/home-administrador']);
  }

  irChat(idEncargado: any): void{
    localStorage.setItem("idConversacion", idEncargado.toString());
    localStorage.setItem("tipoConversacion",'encargado');
    this.router.navigate(['/chat']);
  }
}
