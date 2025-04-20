import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EncargadoService } from '../../servicios/encargado.service';
import { jwtDecode } from 'jwt-decode';

interface TokenData {
  sub: string;
  id: number;
  UserType: string;
  exp: number;
}

@Component({
  selector: 'app-home-encargado',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './home-encargado.component.html',
  styleUrl: './home-encargado.component.scss'
})
export class HomeEncargadoComponent implements OnInit{

  private id = 0;
  private userType = 'None';
  encargado: any = null;

  constructor(private route:ActivatedRoute, 
                  private router: Router,
                  private encargadoService: EncargadoService,
                ){}

  ngOnInit(): void {
    const  token = localStorage.getItem('token');
    if(token){
          const decoded = jwtDecode<TokenData>(token);
          this.id = decoded.id;
          this.userType = decoded.UserType;
        }

    if (this.id != 0 && this.userType == 'encargado') {
      this.encargadoService.getEncargadoById(+this.id).subscribe({
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

  irNinos(): void {
    if (this.encargado) {
        this.router.navigate([`/ninos-hogar/${this.encargado.id}`]);
    }
  }
}
