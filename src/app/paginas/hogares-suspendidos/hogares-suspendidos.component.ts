import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EncargadoService } from '../../servicios/encargado.service';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';
import { TEXTOS } from '../../config/constants';

@Component({
  selector: 'app-hogares-suspendidos',
  imports: [CommonModule, FormsModule],
  templateUrl: './hogares-suspendidos.component.html',
  styleUrl: './hogares-suspendidos.component.scss'
})
export class HogaresSuspendidosComponent implements OnInit {
  encargados: any[] = [];
  encargadosSuspendidos: any[] = [];

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
            this.encargadosSuspendidos = data.filter((e: any) => e.estado === 'Suspendido');
          },
          error => console.log(error),
          () => console.log('Encargados Obtenidos Exitosamente!')
        );
      }
    }

    getNecesidadesAsString(encargado: any): string {
      if (encargado.necesidades && encargado.necesidades.length) {
        return encargado.necesidades.map((necesidad:any) => necesidad.nombre).join(', ');
      }
      return 'No hay necesidades registradas.';
    }

    revisarHogar(encargado: any):void{
      encargado.estado = 'En revision';
      this.encargadoService.updateEncargado(encargado.id, encargado).subscribe(()=>{
        alert('El Hogar ha sido agregado a la lista de revisiones');
        this.ngOnInit();
      })
    }

    verDetalles(idEncargado: number): void{
      localStorage.setItem("idEncargado_gestion", idEncargado.toString());
      this.router.navigate([`/perfil-encargado`]);
    }

    irChat(idEncargado: any): void{
      localStorage.setItem("idConversacion", idEncargado.toString());
      localStorage.setItem("tipoConversacion",'encargado');
      this.router.navigate(['/chat']);
    }

    volverAGestion():void{
      window.history.back();
    }
}
