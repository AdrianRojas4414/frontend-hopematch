import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DonacionService } from '../../servicios/donacion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-donacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-donacion.component.html',
  styleUrls: ['./detalle-donacion.component.scss']
})
export class DetalleDonacionComponent implements OnInit {
  donacion: any = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private donacionService: DonacionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.donacionService.getDonacionById(+id).subscribe({
        next: (data) => {
          this.donacion = data;
          this.isLoading = false;
          if (typeof this.donacion.comentarioEncargado === 'string') {
            try {
              this.donacion.comentarioEncargado = JSON.parse(this.donacion.comentarioEncargado);
            } catch (error) {
              console.error("Error al parsear JSON:", error);
            }
          }
        },
        error: (err) => {
          console.error('Error al cargar donación:', err);
          this.isLoading = false;
        }
      });
    }
  }

  volverAHome(): void {
    this.router.navigate(['/home-padrino']);
  }
}