import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DonacionService } from '../../servicios/donacion.service';

@Component({
  selector: 'app-comentario-dialog',
  templateUrl: './comentario-dialog.component.html',
  styleUrls: ['./comentario-dialog.component.scss']
})
export class ComentarioDialogComponent {
  comentario: string = '';
  fotoPrevia: string | ArrayBuffer | null = null;
  archivoSeleccionado: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<ComentarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { donacionId: number },
    private donacionService: DonacionService
  ) {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.archivoSeleccionado = file;
      const reader = new FileReader();
      reader.onload = (e) => this.fotoPrevia = reader.result;
      reader.readAsDataURL(file);
    }
  }

  guardarComentario(): void {
    const formData = new FormData();
    formData.append('comentario', this.comentario);
    if (this.archivoSeleccionado) {
      formData.append('fotoComprobante', this.archivoSeleccionado);
    }

    this.donacionService.agregarComentario(this.data.donacionId, formData).subscribe({
      next: (res) => {
        this.dialogRef.close(res);
      },
      error: (err) => {
        console.error('Error al guardar comentario:', err);
      }
    });
  }
}