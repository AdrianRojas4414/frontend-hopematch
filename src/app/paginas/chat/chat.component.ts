import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../servicios/user-authentication.service';
import { Router } from '@angular/router';
import { PadrinoService } from '../../servicios/padrino.service';
import { EncargadoService } from '../../servicios/encargado.service';
import { AdministradorService } from '../../servicios/administrador.service';
import { Mensaje } from '../../models/mensaje';
import { MensajeService } from '../../servicios/mensaje.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-chat',
  imports: [FormsModule, CommonModule, MatRadioModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit{
  idUsuario: number = 0;
  tipoUsuario: any = null;
  idConversacion: any = null;
  tipoConversacion: any = null;
  padrino: any = null;
  encargado: any = null;
  administrador: any = null;
  mensajesOrdenados: Mensaje[] = [];
  enviadosFiltrados: Mensaje[] = [];
  recibidosFiltrados: Mensaje[] = [];
  nuevoMensaje: string = '';

  constructor(
    private authService: UserAuthenticationService, 
    private router: Router,
    private padrinoService: PadrinoService,
    private encargadoService: EncargadoService,
    private administradorService: AdministradorService,
    private mensajeService: MensajeService
  ){}

  ngOnInit(): void {
    this.idUsuario = this.authService.getUserId();
    this.tipoUsuario = this.authService.getUserType();
    this.idConversacion = localStorage.getItem('idConversacion');
    this.tipoConversacion = localStorage.getItem('tipoConversacion');

    if(this.idUsuario === 0){
        this.router.navigate(['#']);
    }

    if (this.idUsuario != 0) {
      if (this.tipoUsuario == 'padrino'){
        this.getPadrino(this.idUsuario);
        if(this.tipoConversacion == 'encargado') this.getEncargado(this.idConversacion);
        if(this.tipoConversacion == 'administrador') this.getAdministrador(this.idConversacion);
      }

      if (this.tipoUsuario == 'encargado'){
        this.getEncargado(this.idUsuario);
        if(this.tipoConversacion == 'padrino') this.getPadrino(this.idConversacion);
        if(this.tipoConversacion == 'administrador') this.getAdministrador(this.idConversacion);
      }

      if (this.tipoUsuario == 'administrador'){
        this.getAdministrador(this.idUsuario);
        if(this.tipoConversacion == 'padrino') this.getPadrino(this.idConversacion);
        if(this.tipoConversacion == 'encargado') this.getEncargado(this.idConversacion);
      }
      this.cargarMensajes();
    }
  }

  getPadrino(id:any): void{
    this.padrinoService.getPadrinoById(+id).subscribe({
      next: (data) => {
        this.padrino = data;
      },
      error: (err) => {
        console.error('Error al obtener datos del padrino:', err);
      }
    });
  }

  getEncargado(id:any): void{
    this.encargadoService.getEncargadoById(+id).subscribe({
      next: (data) => {
        this.encargado = data;
      },
      error: (err) => {
        console.error('Error al obtener datos del encargado:', err);
      }
    });
  }

  getAdministrador(id:any):void{
    this.administradorService.getAdministradorById(+id).subscribe({
      next: (data) => {
        this.administrador = data;
      },
      error: (err) => {
        console.error('Error al obtener datos del administrador:', err);
      }
    });
  }

  cargarMensajes(): void {
    const remitenteId = +this.idUsuario;
    const destinatarioId = +this.idConversacion;

    if (!remitenteId || !destinatarioId) return;

    this.mensajeService.obtenerMensajesPorRemitente(remitenteId).subscribe(mensajesEnviados => {
      this.enviadosFiltrados = mensajesEnviados.filter(m => m.idDestinatario === destinatarioId && m.destinatario != m.remitente && m.remitente === this.tipoUsuario && m.destinatario === this.tipoConversacion);
      this.mensajeService.obtenerMensajesPorDestinatario(remitenteId).subscribe(mensajesRecibidos => {
          this.recibidosFiltrados = mensajesRecibidos.filter(m => m.idRemitente === destinatarioId && m.destinatario != m.remitente && m.remitente === this.tipoConversacion && m.destinatario === this.tipoUsuario);

          if(this.enviadosFiltrados.length == 0 && this.recibidosFiltrados.length == 0) return;

          const todos = [...this.enviadosFiltrados, ...this.recibidosFiltrados];
          const unicos = todos.filter((m, index, self) =>
            index === self.findIndex((t) => t.id === m.id)
          );

          this.mensajesOrdenados = unicos.sort(
            (a, b) => new Date(a.fecha!).getTime() - new Date(b.fecha!).getTime()
          );
        });
      });
  }

  enviar(): void {
    if (!this.nuevoMensaje.trim()) return;

    const mensaje: Mensaje = {
      idRemitente: +this.idUsuario,
      idDestinatario: +this.idConversacion,
      remitente: this.tipoUsuario,
      destinatario: this.tipoConversacion,
      mensaje: this.nuevoMensaje
    };

    this.mensajeService.enviarMensaje(mensaje).subscribe(res => {
      this.nuevoMensaje = '';
      this.cargarMensajes();
    });
  }

  volverAtras() {
    localStorage.removeItem("idConversacion");
    localStorage.removeItem("tipoConversacion");
    window.history.back();
  }

  agendarVisita(): void {
    localStorage.setItem("idHogarVisita", this.encargado.id.toString());
    this.router.navigate(['/registro-visita']);
  }

}
