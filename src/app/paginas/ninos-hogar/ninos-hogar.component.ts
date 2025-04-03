import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EncargadoService } from '../../servicios/encargado.service';

@Component({
  selector: 'app-ninos-hogar',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './ninos-hogar.component.html',
  styleUrl: './ninos-hogar.component.scss'
})
export class NinosHogarComponent implements OnInit{

  encargado: any = null;
  
  constructor(private route: ActivatedRoute, private encargadoService: EncargadoService, private router: Router){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.encargadoService.getEncargadoById(+id).subscribe({
        next: (data) => {
          this.encargado = data;
        },
        error: (err) => {
          console.error('Error al obtener encargado:', err);
        }
      });
    }
  }

  editarNino(idNino: number, idEncargado: number): void {
    this.router.navigate([`/editar-nino/${idNino}`], { queryParams: { encargado: idEncargado } });
  }

  irCrearNino(): void {
    if (this.encargado) {
      this.router.navigate([`/crear-nino/${this.encargado.id}`]);
    }
  }

  VolverAHome():void{
    if (this.encargado) {
      this.router.navigate([`/home-encargado/${this.encargado.id}`]);
    }
  }
}
