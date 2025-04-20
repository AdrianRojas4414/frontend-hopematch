import { Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { CrearPadrinoComponent } from './paginas/crear-padrino/crear-padrino.component';
import { CrearEncargadoComponent } from './paginas/crear-encargado/crear-encargado.component';
import { LoginComponent } from './paginas/login/login.component';
import { PerfilEncargadoComponent } from './paginas/perfil-encargado/perfil-encargado.component';
import { PerfilPadrinoComponent } from './paginas/perfil-padrino/perfil-padrino.component';
import { CrearNinoComponent } from './paginas/crear-nino/crear-nino.component';
import { PerfilNinoComponent } from './paginas/perfil-nino/perfil-nino.component';
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

export const routes: Routes = [
    {path:'', component: InicioComponent, title:"Pagina de Inicio"},
    {path:'crearpadrino', component: CrearPadrinoComponent, title:"Forulario para la creacion de un Padrino"},
    {path:'crearencargado', component: CrearEncargadoComponent, title:"Forulario para la creacion de un Encargado"},
    {path:'crear-nino/:idEncargado', component: CrearNinoComponent, title: "Formulario de creacion de nino"},
    {path:'perfil-encargado/:id', component: PerfilEncargadoComponent, title: "Encargado"},
    {path:'perfil-padrino/:id', component: PerfilPadrinoComponent, title: 'Padrino'},
    {path:'perfil-nino/:ci', component: PerfilNinoComponent, title:'Nino'},
    {path:'editar-perfil-encargado/:id', component: EditarEncargadoComponent, title: "Editar Encargado"},
    {path:'editar-perfil-padrino/:id', component: EditarPadrinoComponent, title: 'Padrino'},
    {path:'home-padrino/:id', component: HomePadrinoComponent, title:'Pagina Padrino'},
    {path:'home-encargado', component: HomeEncargadoComponent, title:'Pagina Encargado'},
    {path:'editar-nino/:id', component: EditarNinoComponent, title:'Nino'},
    {path:'detalle-hogar/:id', component:DetalleHogarComponent, title:'Detales del Hogar'},
    {path:'login', component: LoginComponent, title: "Log in"},
    {path:'registro-donacion/:padrinoId/:encargadoId', component: RegistroDonacionComponent },
    {path:'detalle-donacion/:id', component: DetalleDonacionComponent, title: 'Detalle de Donación' },
    {path:'hogar-encargado/:id', component: HogarEncargadoComponent, title: 'Mi Hogar' },
    {path:'ninos-hogar/:id', component: NinosHogarComponent, title: 'Ninos'},
    {path:'encargado-donacion/:id', component: EncargadoDonacionComponent},
    {path:'crearencargado', component: CrearEncargadoComponent, title:"Formulario para la creación de un Encargado"},
    {path:'crear-administrador', component: CrearAdministradorComponent, title:"Formulario para la creación de un Administrador"},
    {path: 'home-administrador', component: HomeAdministradorComponent, title: 'Panel de Administrador' },
    {path:'**', redirectTo:'', pathMatch: 'full'}
]; 