export interface Mensaje {
  id?: number;
  idRemitente: number;
  idDestinatario: number;
  remitente: string;
  destinatario: string;
  mensaje: string;
  fecha?: string;
  leido?: boolean;
}