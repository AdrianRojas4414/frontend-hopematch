import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncargadoService } from '../../servicios/encargado.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { UserAuthenticationService } from '../../servicios/user-authentication.service';

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
    private router: Router,
    private encargadoService: EncargadoService,
    private authService: UserAuthenticationService
  ) {}

  ngOnInit(): void {
    const id = this.authService.getUserId();
    const isEncargado = this.authService.isUserType('encargado');

    if(id === 0  || !isEncargado){
      this.router.navigate(['#']);
    }

    if(isEncargado){
      this.encargadoService.getEncargadoById(id).subscribe(data => {
      this.encargado = data;
    });
    }
  }

  updateEncargado(): void {
    this.encargadoService.updateEncargado(this.encargado.id, this.encargado)
      .subscribe(() => {
        alert('Encargado actualizado correctamente');
        window.history.back();
      });
  }

  eliminarEncargado(): void{
    if(confirm('¿Estas seguro que deseas eliminar la cuenta?')){
      this.encargado.estado = "Suspendido";
      this.encargadoService.updateEncargado(this.encargado.id, this.encargado)
      .subscribe(()=> {
        alert("Su cuenta se encuentra SUSPENDIDA, por favor contáctese con Soporte Técnico.");
        this.authService.logout();
        console.log(this.encargado)
        window.history.back();
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 500);
      })
    }
  }
  
  cancelarEdicion(): void {
    this.router.navigate([`/perfil-encargado`]);
  }
}
