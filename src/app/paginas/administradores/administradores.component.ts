import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdministradorService } from '../../servicios/administrador.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-administradores',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './administradores.component.html',
  styleUrl: './administradores.component.scss'
})
export class AdministradoresComponent implements OnInit {

  administradores: any[] = [];
  encargadosEnRevision: any[] = [];
  encargadosAprobados: any[] = [];
  
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private administradorService: AdministradorService
    ) {}
  
    ngOnInit(): void {
      this.administradorService.getAdministradores().subscribe(
        data => {
          this.administradores = data;
          console.log("EXITO");
        },
        error => console.log(error),
        () => console.log('No se pudo obtener a los administradores')
      );
    }

    irChat(idAdministrador: any): void{
      localStorage.setItem("idConversacion", idAdministrador.toString());
      localStorage.setItem("tipoConversacion",'administrador');
      this.router.navigate(['/chat']);
    }

    Volver():void{
      window.history.back();
    }

}
