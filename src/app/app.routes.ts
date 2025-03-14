import { Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { CrearPadrinoComponent } from './paginas/crear-padrino/crear-padrino.component';
import { CrearEncargadoComponent } from './paginas/crear-encargado/crear-encargado.component';

export const routes: Routes = [
    //{path:'', component: InicioComponent, title:"Pagina de Inicio"},
    {path:'crearpadrino', component: CrearPadrinoComponent, title:"Forulario para la creacion de un Padrino"},
    {path:'crearencargado', component: CrearEncargadoComponent, title:"Forulario para la creacion de un Encargado"},
    {path:'**', redirectTo:'', pathMatch: 'full'}
]; 