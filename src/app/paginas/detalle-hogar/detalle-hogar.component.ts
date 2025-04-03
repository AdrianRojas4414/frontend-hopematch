import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EncargadoService } from '../../servicios/encargado.service';

@Component({
  selector: 'app-detalle-hogar',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './detalle-hogar.component.html',
  styleUrl: './detalle-hogar.component.scss'
})
export class DetalleHogarComponent implements OnInit{

  encargado: any = null;
  nino: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private encargadService: EncargadoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.encargadService.getEncargadoById(+id).subscribe({
        next: (data) => {
          this.encargado = data;
        },
        error: (err) => {
          console.error('Error al obtener hogar:', err);
        }
      });
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
