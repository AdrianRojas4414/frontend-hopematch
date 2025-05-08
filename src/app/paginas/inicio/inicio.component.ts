import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TEXTOS } from '../../config/constants';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})


export class InicioComponent implements OnInit{
  public texts = TEXTOS
  
  ngOnInit(): void {
  }

  scrollToSection(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
