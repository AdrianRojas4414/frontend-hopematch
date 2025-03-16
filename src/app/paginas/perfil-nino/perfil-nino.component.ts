import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EncargadoService } from '../../servicios/encargado.service';
import { NinoService } from '../../servicios/nino.service';

@Component({
  selector: 'app-perfil-nino',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './perfil-nino.component.html',
  styleUrl: './perfil-nino.component.scss'
})
export class PerfilNinoComponent implements OnInit{

  nino: any = null;

  constructor(private route: ActivatedRoute, private ninoService: NinoService, private router: Router){}

  ngOnInit(): void {
    const ci = this.route.snapshot.paramMap.get('ci');

    if (ci) {
      this.ninoService.getNinoByCi(+ci).subscribe({
        next: (data) => {
          this.nino = data;
        },
        error: (err) => {
          console.error('Error al obtener encargado:', err);
        }
      });
    }
  }

}
