import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PadrinoService } from '../../servicios/padrino.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-padrino',
  imports: [RouterLink, CommonModule],
  templateUrl: './perfil-padrino.component.html',
  styleUrl: './perfil-padrino.component.scss'
})
export class PerfilPadrinoComponent implements OnInit{
  padrino: any = null;

  constructor(private route:ActivatedRoute, private padrinoService: PadrinoService, private router: Router){}

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
  }

  irEditarPerfil(): void{
    if (this.padrino) {
      this.router.navigate([`/editar-perfil-padrino/${this.padrino.id}`]);
    }
  }
}
