import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TEXTOS } from '../../config/constants';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})

export class InicioComponent {
  public texts = TEXTOS
  
}
