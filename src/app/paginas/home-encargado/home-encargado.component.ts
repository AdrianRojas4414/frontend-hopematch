import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EncargadoService } from '../../servicios/encargado.service';

@Component({
  selector: 'app-home-encargado',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './home-encargado.component.html',
  styleUrl: './home-encargado.component.scss'
})
export class HomeEncargadoComponent implements OnInit{

  encargado: any = null;

  constructor(private route:ActivatedRoute, 
                  private router: Router,
                  private encargadoService: EncargadoService,
                ){}

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

  irPerfil(): void{
    if (this.encargado) {
      this.router.navigate([`/perfil-encargado/${this.encargado.id}`]);
    }
  }

  irHogar(): void{
    if (this.encargado) {
      this.router.navigate([`/hogar-encargado/${this.encargado.id}`]);
    }
  }

  irDonaciones(): void {
    if (this.encargado) {
        this.router.navigate([`/encargado-donacion/${this.encargado.id}`]);
    }
  }
}
