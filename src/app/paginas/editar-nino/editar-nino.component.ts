import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NinoService } from '../../servicios/nino.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-editar-nino',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-nino.component.html',
  styleUrl: './editar-nino.component.scss'
})
export class EditarNinoComponent {
  nino: any = {};
  idEncargado: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ninoService: NinoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.idEncargado = Number(this.route.snapshot.queryParamMap.get('encargado'));

    this.ninoService.getNinoById(id).subscribe((data:any) => {
      this.nino = data;
    });
  }

  updateNino(): void {
    this.ninoService.updateNino(this.nino.id, this.nino)
      .subscribe(() => {
        alert('Niño actualizado correctamente');
        this.router.navigate([`/perfil-encargado/${this.idEncargado}`]);
        //this.router.navigate(['/']);
      });
  }
}
