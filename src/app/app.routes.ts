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
    {path:'editar-nino/:id', component: EditarNinoComponent, title:'Nino'},
    {path:'login', component: LoginComponent, title: "Log in"},
    { path: 'registro-donacion/:padrinoId/:encargadoId', component: RegistroDonacionComponent },
    { path: 'detalle-donacion/:id', component: DetalleDonacionComponent, title: 'Detalle de Donación' },
    {path:'**', redirectTo:'', pathMatch: 'full'}
]; 