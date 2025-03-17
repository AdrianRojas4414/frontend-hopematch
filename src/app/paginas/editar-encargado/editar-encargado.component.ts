import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncargadoService } from '../../servicios/encargado.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-editar-encargado',
  standalone: true, 
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-encargado.component.html',
  styleUrl: './editar-encargado.component.scss'
})
export class EditarEncargadoComponent {
  encargado: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private encargadoService: EncargadoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.encargadoService.getEncargadoById(id).subscribe(data => {
      this.encargado = data;
    });
  }

  updateEncargado(): void {
    this.encargadoService.updateEncargado(this.encargado.id, this.encargado)
      .subscribe(() => {
        alert('Encargado actualizado correctamente');
        this.router.navigate([`/perfil-encargado/${this.encargado.id}`]);
      });
  }
}
