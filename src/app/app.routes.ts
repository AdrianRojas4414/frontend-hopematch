import { Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { CrearPadrinoComponent } from './paginas/crear-padrino/crear-padrino.component';
import { CrearEncargadoComponent } from './paginas/crear-encargado/crear-encargado.component';
import { LoginComponent } from './paginas/login/login.component';
import { PerfilEncargadoComponent } from './paginas/perfil-encargado/perfil-encargado.component';
import { PerfilPadrinoComponent } from './paginas/perfil-padrino/perfil-padrino.component';
import { CrearNinoComponent } from './paginas/crear-nino/crear-nino.component';
import { EditarEncargadoComponent } from './paginas/editar-encargado/editar-encargado.component';
import { EditarNinoComponent } from './paginas/editar-nino/editar-nino.component';
import { EditarPadrinoComponent } from './paginas/editar-padrino/editar-padrino.component';
import { HomePadrinoComponent } from './paginas/home-padrino/home-padrino.component';
import { RegistroDonacionComponent } from './paginas/registro-donacion/registro-donacion.component';
import { DetalleDonacionComponent } from './paginas/detalle-donacion/detalle-donacion.component';
import { DetalleHogarComponent } from './paginas/detalle-hogar/detalle-hogar.component';
import { HomeEncargadoComponent } from './paginas/home-encargado/home-encargado.component';
import { HogarEncargadoComponent } from './paginas/hogar-encargado/hogar-encargado.component';
import { EncargadoDonacionComponent } from './paginas/encargado-donacion/encargado-donacion.component';
import { NinosHogarComponent } from './paginas/ninos-hogar/ninos-hogar.component';
import { CrearAdministradorComponent } from './paginas/crear-administrador/crear-administrador.component';
import { HomeAdministradorComponent } from './paginas/home-administrador/home-administrador.component';
import { PerfilAdministradorComponent } from './paginas/perfil-administrador/perfil-administrador.component';
import { EditarAdministradorComponent } from './paginas/editar-administrador/editar-administrador.component';
import { RegistroVisitaComponent } from './paginas/registro-visita/registro-visita.component';
import { GestionNinosComponent } from './paginas/gestion-ninos/gestion-ninos.component';
import { GestionPadrinosComponent } from './paginas/gestion-padrinos/gestion-padrinos.component';
import { DetallePadrinoComponent } from './paginas/detalle-padrino/detalle-padrino.component';
import { PadrinosSuspendidosComponent } from './paginas/padrinos-suspendidos/padrinos-suspendidos.component';
import { GestionHogaresComponent } from './paginas/gestion-hogares/gestion-hogares.component';
import { HogaresSuspendidosComponent } from './paginas/hogares-suspendidos/hogares-suspendidos.component';
import { ChatComponent } from './paginas/chat/chat.component';
import { AdministradorService } from './servicios/administrador.service';
import { AdministradoresComponent } from './paginas/administradores/administradores.component';

export const routes: Routes = [
    {path:'', component: InicioComponent, title:"Hopematch"},
    {path:'crearpadrino', component: CrearPadrinoComponent, title:"Formulario Creacion Padrino"},
    {path:'crearencargado', component: CrearEncargadoComponent, title:"Formulario Creacion Encargado"},
    {path:'crear-nino', component: CrearNinoComponent, title: "Formulario Creacion Nino"},
    {path:'perfil-encargado', component: PerfilEncargadoComponent, title: "Perfil Encargado"},
    {path:'perfil-padrino', component: PerfilPadrinoComponent, title: 'Perfil Padrino'},
    {path:'editar-perfil-encargado', component: EditarEncargadoComponent, title: "Edicion Perfil Encargado"},
    {path:'editar-perfil-padrino', component: EditarPadrinoComponent, title: 'Edicion Perfil Padrino'},
    {path:'home-padrino', component: HomePadrinoComponent, title:'Home Padrino'},
    {path:'home-encargado', component: HomeEncargadoComponent, title:'Home Encargado'},
    {path:'editar-nino', component: EditarNinoComponent, title:'Edicion Datos Nino'},
    {path:'detalle-hogar', component:DetalleHogarComponent, title:'Detalles de Hogar'},
    {path:'login', component: LoginComponent, title: "Log in"},
    {path:'registro-donacion', component: RegistroDonacionComponent, title:'Registro Donacion' },
    {path:'detalle-donacion', component: DetalleDonacionComponent, title: 'Detalle Donación' },
    {path:'hogar-encargado', component: HogarEncargadoComponent, title: 'Mi Hogar' },
    {path:'ninos-hogar', component: NinosHogarComponent, title: 'Ninos del Hogar'},
    {path:'encargado-donacion', component: EncargadoDonacionComponent, title: 'Donaciones'},
    {path:'crearencargado', component: CrearEncargadoComponent, title:"Formulario Creacion Encargado"},
    {path:'crear-administrador', component: CrearAdministradorComponent, title:"Formulario Creacion Administrador"},
    {path: 'home-administrador', component: HomeAdministradorComponent, title: 'Home Administrador' },
    {path: 'perfil-administrador', component: PerfilAdministradorComponent, title: 'Perfil Administrador' },
    {path: 'editar-perfil-administrador', component: EditarAdministradorComponent, title: 'Edicion Perfil Administrador' },
    {path: 'gestion-padrinos', component: GestionPadrinosComponent, title: 'Gestion Padrinos'},
    {path: 'detalle-padrino/:id', component: DetallePadrinoComponent, title: 'Detalle Padrinos'},
    {path: 'padrinos-suspendidos', component: PadrinosSuspendidosComponent, title: 'Gestion Padrinos Suspendidos'},
    {path: 'gestion-hogares', component: GestionHogaresComponent, title: 'Gestion Hogares'},
    {path: 'hogares-suspendidos', component: HogaresSuspendidosComponent, title: 'Gestion Hogares Suspendidos'},
    { path: 'registro-visita', component: RegistroVisitaComponent, title: 'Registrar Visita' },
    {path: 'gestion-ninos', component:GestionNinosComponent, title: 'Gestion Ninos'},
    {path: 'chat', component: ChatComponent, title: 'Chat Hopematch'},
    {path: 'administradores', component: AdministradoresComponent, title: 'Administradores'},
    {path:'**', redirectTo:'', pathMatch: 'full'}
]; 