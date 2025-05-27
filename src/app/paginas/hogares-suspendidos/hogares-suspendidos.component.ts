import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EncargadoService } from '../../servicios/encargado.service';

@Component({
  selector: 'app-hogares-suspendidos',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './hogares-suspendidos.component.html',
  styleUrl: './hogares-suspendidos.component.scss'
})
export class HogaresSuspendidosComponent implements OnInit {

  encargados: any[] = [];
  encargadosSuspendidos: any[] = [];

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private encargadoService: EncargadoService
    ) {}

    ngOnInit(): void {
      this.encargadoService.getEncargados().subscribe(
        data => {
          this.encargados = data;
          this.encargadosSuspendidos = data.filter((e: any) => e.estado === 'En suspencion' || e.estado === 'Rechazado');
        },
        error => console.log(error),
        () => console.log('Encargados Obtenidos Exitosamente!')
      );
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

    volverAGestion(): void {
      this.router.navigate(['/gestion-hogares']);
    }
}
