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

  constructor(private authService: UserAuthenticationService, 
              private router: Router,
              private padrinoService: PadrinoService,
              private encargadoService: EncargadoService,
              private administradorService: AdministradorService,
              private mensajeService: MensajeService)
  {}

  idUsuario: number = 0;
  tipoUsuario: string | null = null;
  idConversacion: any = null;
  tipoConversacion: string | null = null;
  padrino: any = null;
  encargado: any = null;
  administrador: any = null;
  nombreUsuario: any = null;
  nombreDestinatario: any = null;
  mensajes: Mensaje[] = [];
  nuevoMensaje: string = '';

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
            this.getPadrino(this.idUsuario, 'usuario');

            if(this.tipoConversacion == 'encargado'){
              this.getEncargado(this.idConversacion, 'conversacion');
            }

            if(this.tipoConversacion == 'administrador'){
              this.getAdministrador(this.idConversacion, 'conversacion');
            }
          }

          if (this.tipoUsuario == 'encargado'){
            this.getEncargado(this.idUsuario, 'usuario');

            if(this.tipoConversacion == 'padrino'){
              this.getPadrino(this.idConversacion, 'conversacion');
            }

            if(this.tipoConversacion == 'administrador'){
              this.getAdministrador(this.idConversacion, 'conversacion');
            }
          }

          if (this.tipoUsuario == 'administrador'){
            this.getAdministrador(this.idUsuario, 'usuario');

            if(this.tipoConversacion == 'padrino'){
              this.getPadrino(this.idConversacion, 'conversacion');
            }

            if(this.tipoConversacion == 'encargado'){
              this.getEncargado(this.idConversacion, 'conversacion');
            }
          }
        
        this.cargarMensajes();
      
      }
  }

  getPadrino(id:any, tipo:string): void{
    this.padrinoService.getPadrinoById(+id).subscribe({
      next: (data) => {
        this.padrino = data;

        if(tipo == 'usuario'){
          this.nombreUsuario = this.padrino.nombre;
        }
        if(tipo == 'conversacion'){
          this.nombreDestinatario = this.padrino.nombre;
        }
      },
      error: (err) => {
        console.error('Error al obtener datos del padrino:', err);
      }
    });
  }

  getEncargado(id:any, tipo:string): void{
    this.encargadoService.getEncargadoById(+id).subscribe({
      next: (data) => {
        this.encargado = data;

        if(tipo == 'usuario'){
          this.nombreUsuario = this.encargado.nombre;
        }
        if(tipo == 'conversacion'){
          this.nombreDestinatario = this.encargado.nombre;
        }
      },
      error: (err) => {
        console.error('Error al obtener datos del encargado:', err);
      }
    });
  }

  getAdministrador(id:any, tipo:string):void{
    this.administradorService.getAdministradorById(+id).subscribe({
      next: (data) => {
        this.administrador = data;

        if(tipo == 'usuario'){
          this.nombreUsuario = this.administrador.nombre;
        }
        if(tipo == 'conversacion'){
          this.nombreDestinatario = this.administrador.nombre;
        }
      },
      error: (err) => {
        console.error('Error al obtener datos del administrador:', err);
      }
    });
  }

  cargarMensajes(): void {
    const remitenteId = this.idUsuario;
    const destinatarioId = Number(this.idConversacion);

    if (!remitenteId || !destinatarioId) return;

    // Obtener mensajes enviados por el usuario actual
    this.mensajeService.obtenerMensajesPorRemitente(remitenteId).subscribe(mensajesEnviados => {
      const enviadosFiltrados = mensajesEnviados.filter(m => m.idDestinatario === destinatarioId);

      // Obtener mensajes recibidos por el usuario actual
      this.mensajeService.obtenerMensajesPorDestinatario(remitenteId).subscribe(mensajesRecibidos => {
        const recibidosFiltrados = mensajesRecibidos.filter(m => m.idRemitente === destinatarioId);

        // Juntar, ordenar y asignar
        this.mensajes = [...enviadosFiltrados, ...recibidosFiltrados]
          .sort((a, b) => new Date(a.fecha!).getTime() - new Date(b.fecha!).getTime());
      });
    });
  }

  enviar(): void {
    if (!this.nuevoMensaje.trim()) return;

    const mensaje: Mensaje = {
      idRemitente: this.idUsuario,
      idDestinatario: +this.idConversacion,
      remitente: this.nombreUsuario,
      destinatario: this.nombreDestinatario,
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
