import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EncargadoService } from '../../servicios/encargado.service';

@Component({
  selector: 'app-gestion-hogares',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './gestion-hogares.component.html',
  styleUrl: './gestion-hogares.component.scss'
})
export class GestionHogaresComponent implements OnInit{

  encargados: any[] = [];
  encargadosEnRevision: any[] = [];
  encargadosAprobados: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private encargadoService: EncargadoService
  ) {}

  ngOnInit(): void {
    this.encargadoService.getEncargados().subscribe(
      data => {
        this.encargados = data;
        this.encargadosEnRevision = data.filter((e: any) => e.estado === 'En revision');
        this.encargadosAprobados = data.filter((e: any) => e.estado === 'Aprobado');
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

  irPerfil(idEncargado: number): void{
    this.router.navigate([`/perfil-encargado/${idEncargado}`]);
  }

  aprobarHogar(encargado: any):void{
    encargado.estado = "Aprobado";
    this.encargadoService.updateEncargado(encargado.id, encargado).subscribe(()=>{
      alert('El Hogar ha sido aprobado y puede recibir donaciones');
    })
  }
}
