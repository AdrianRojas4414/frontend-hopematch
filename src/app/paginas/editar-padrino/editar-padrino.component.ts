import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PadrinoService } from '../../servicios/padrino.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-padrino',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-padrino.component.html',
  styleUrl: './editar-padrino.component.scss'
})
export class EditarPadrinoComponent implements OnInit {
  padrino: any = {}; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private padrinoService: PadrinoService 
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.padrinoService.getPadrinoById(id).subscribe(data => {
      this.padrino = data;
      console.log(this.padrino)
    });
  }

  updatePadrino(): void {
    this.padrinoService.updatePadrino(this.padrino.id, this.padrino)
      .subscribe(() => {
        alert('Padrino actualizado correctamente');
        this.router.navigate([`/perfil-padrino/${this.padrino.id}`]);
      });
  }

  eliminarPadrino(): void{
    if(confirm('¿Estas seguro que deseas eliminar la cuenta?')){
      this.padrino.nombre = "Rodrigo Fiesta";
      this.padrino.estado = "En suspencion";
      this.padrinoService.updatePadrino(this.padrino.id, this.padrino)
      .subscribe(()=> {
        alert('La cuenta se encuentra en un estado de suspencion. Sus datos seran eliminados por completo dentro de 6 meses');
        console.log(this.padrino)
        this.router.navigate([`/perfil-padrino/${this.padrino.id}`]);
      })
    }
  }
}