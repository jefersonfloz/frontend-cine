import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { OrdenesComponent } from './componentes/ordenes/ordenes.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { ErrorcitoComponent } from './componentes/errorcito/errorcito.component';
import { IniciarsesionComponent } from './componentes/iniciarsesion/iniciarsesion.component';
import { RegistrarseComponent } from './componentes/registrarse/registrarse.component';
import { SalasComponent } from './componentes/salas/salas.component';
import { FuncionesComponent } from './componentes/funciones/funciones.component';
import { Error404Component } from './componentes/error404/error404.component';
import { CarteleraComponent } from './componentes/cartelera/cartelera.component';

export const routes: Routes = [
    { path: 'home', component: InicioComponent },
    { path: 'clients', component: ClientesComponent },
    { path: 'orders', component: OrdenesComponent },
    { path: 'products', component: ProductosComponent },
    { path: 'dashboard', component: TableroComponent },
    { path: 'salas', component: SalasComponent},
    {path:'login',component:IniciarsesionComponent},
    {path:'funcions',component:FuncionesComponent},
    {path:'register',component:RegistrarseComponent},
    {path:'cartelera',component:CarteleraComponent},
    {path:'rre',component:Error404Component},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: ErrorcitoComponent }
];
