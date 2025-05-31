import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EncargadoService } from '../../servicios/encargado.service';
import { NinoService } from '../../servicios/nino.service';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';

@Component({
  selector: 'app-ninos-hogar',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './ninos-hogar.component.html',
  styleUrl: './ninos-hogar.component.scss'
})
export class NinosHogarComponent implements OnInit{
  encargado: any = null;
  
  constructor(
    private encargadoService: EncargadoService, 
    private router: Router,
    private ninoService: NinoService,
    private authService: UserAuthenticationService
  ){}

  ngOnInit(): void {
    const id = this.authService.getUserId();
    const isEncargado = this.authService.isUserType('encargado');

    if(id === 0 || !isEncargado){
        this.router.navigate(['#']);
    }

    if (isEncargado) {
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

  editarNino(idNino: number): void {
    localStorage.setItem("idNino", idNino.toString());
    this.router.navigate([`/editar-nino`]);
  }

  irCrearNino(): void {
    if (this.encargado) {
      this.router.navigate([`/crear-nino`]);
    }
  }

  VolverAHome():void{
    if (this.encargado) {
      this.router.navigate([`/home-encargado`]);
    }
  }
  eliminarNino(idNino: number): void {
    if (confirm('¿Estás seguro que deseas eliminar este niño? Esta acción es irreversible.')) {
      this.ninoService.deleteNino(idNino).subscribe({
        next: () => {
          this.encargado.ninos = this.encargado.ninos.filter((nino: any) => nino.id !== idNino);
          alert('Niño eliminado correctamente');
        },
        error: (err) => {
          console.error('Error completo:', err);
          if (err.status === 200) { 
            this.encargado.ninos = this.encargado.ninos.filter((nino: any) => nino.id !== idNino);
            alert('Niño eliminado correctamente');
          } else {
            alert(`Error al eliminar: ${err.error?.message || err.message || 'Error desconocido'}`);
          }
        }
      });
    }
  }
}
