import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PadrinoService } from '../../servicios/padrino.service';
import { CommonModule } from '@angular/common';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TEXTOS } from '../../config/constants';
import { EditarPadrinoComponent } from '../editar-padrino/editar-padrino.component';

@Component({
  selector: 'app-perfil-padrino',
  imports: [CommonModule],
  templateUrl: './perfil-padrino.component.html',
  styleUrl: './perfil-padrino.component.scss'
})
export class PerfilPadrinoComponent implements OnInit{
  public texts = TEXTOS;
  padrino: any = null;
  mostrarBotonEditar: boolean = true;

  constructor(
    private padrinoService: PadrinoService, 
    private authService: UserAuthenticationService,
    private router: Router,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    const id = this.authService.getUserId();
    const isPadrino = this.authService.isUserType('padrino');
    const idPadrino_gestion = localStorage.getItem('id_padrino');

    if(id === 0){
      this.router.navigate(['#']);
    }

    if (id || idPadrino_gestion) {
      if(!isPadrino && idPadrino_gestion){
        this.mostrarBotonEditar = false;

        this.padrinoService.getPadrinoById(+idPadrino_gestion).subscribe({
          next: (data) => {
            this.padrino = data;
          },
          error: (err) => {
            console.error('Error al obtener encargado:', err);
          }
        });
      }
      else{
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
  }
  
  cerrarSesion(): void {
    localStorage.removeItem("id_padrino");
    this.authService.logout();
  }

  irEditarPerfil(): void{
    if (this.padrino) {
    const dialogRef = this.dialog.open(EditarPadrinoComponent, {
          width: '500px',
          height: 'fit-content%'
        });
    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró');
    });
    }
  }

  VolverAHome():void{
    if (this.padrino) {
      this.router.navigate([`/home-padrino`]);
    }
  }

  VolverAHomeAdmin(){
    localStorage.removeItem("id_padrino");
    this.router.navigate([`/gestion-padrinos`]);
  }

  irAdministradores(): void{
    this.router.navigate(['/administradores']);
  }
}
