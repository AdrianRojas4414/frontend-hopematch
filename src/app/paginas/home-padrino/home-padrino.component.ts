import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PadrinoService } from '../../servicios/padrino.service';
import { EncargadoService } from '../../servicios/encargado.service';

@Component({
  selector: 'app-home-padrino',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './home-padrino.component.html',
  styleUrl: './home-padrino.component.scss'
})
export class HomePadrinoComponent implements OnInit{

  padrino: any = null;
  encargados: any[] = [];

  constructor(private route:ActivatedRoute, 
                private padrinoService: PadrinoService, 
                private router: Router,
                private encargadoService: EncargadoService){}
  
                
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.padrinoService.getPadrinoById(+id).subscribe({
        next: (data) => {
          this.padrino = data;
        },
        error: (err) => {
          console.error('Error al obtener encargado:', err);
        }
      });
    }

    this.obtenerEncargados();
  }

  obtenerEncargados(): void {
    this.encargadoService.getEncargados().subscribe(
      data => this.encargados = data,
      error => console.log(error),
      () => console.log('Encargados Obtenidos Exitosamente!'),);
      console.log("this.encargados")
  }

  irPerfil(): void{
    if (this.padrino) {
      this.router.navigate([`/perfil-padrino/${this.padrino.id}`]);
    }
  }

  verHogar(idHogar: number): void {
    this.router.navigate([`/perfil-encargado/${idHogar}`]);
  }

  irARegistroDonacion(padrinoId: number, encargadoId: number): void {
    this.router.navigate(['/registro-donacion', padrinoId, encargadoId]);
  }
}
