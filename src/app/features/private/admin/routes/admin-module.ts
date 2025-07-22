import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from '../pages/dashboard/dashboard';
import { ReservasInicio } from '../pages/reservas/reservas-inicio/reservas-inicio';
import { ReservasList } from '../pages/reservas/reservas-list/reservas-list';
import { EspacioEventoInicio } from '../pages/espacio-evento/espacio-evento-inicio/espacio-evento-inicio';
import { EspacioEventoList } from '../pages/espacio-evento/espacio-evento-list/espacio-evento-list';
import { EspacioEventoForm } from '../pages/espacio-evento/espacio-evento-form/espacio-evento-form';
import { PlanesInicio } from '../pages/planes/planes-inicio/planes-inicio';
import { PlanesForm } from '../pages/planes/planes-form/planes-form';
import { PlanesList } from '../pages/planes/planes-list/planes-list';
import { PagosInicio } from '../pages/pagos/pagos-inicio/pagos-inicio';
import { PagosLista } from '../pages/pagos/pagos-lista/pagos-lista';
import { ComentariosInicio } from '../pages/comentarios/comentarios-inicio/comentarios-inicio';
import { ComentariosList } from '../pages/comentarios/comentarios-lista/comentarios-lista';

const adminRoutes: Routes = [
  { path: 'dashboard', component: Dashboard },
  {
    path: 'locales', component: EspacioEventoInicio,
    children: [
      { path: '', component: EspacioEventoList },
      { path: 'agregar', component: EspacioEventoForm },
      { path: 'editar/:id', component: EspacioEventoForm },
    ]
  },
  {
    path: 'planes',
    component: PlanesInicio,
    children: [
      { path: '', component: PlanesList },
      { path: 'agregar', component: PlanesForm },
      { path: 'editar/:id', component: PlanesForm },
    ]
  }
  ,
  {
    path: 'reservas', component: ReservasInicio,
    children: [
      { path: '', component: ReservasList }
    ]
  },{
  path: 'comentarios',
  component: ComentariosInicio,
  children: [
    { path: '', component: ComentariosList }
  ]
}
, {
    path: 'pagos', component: PagosInicio,
    children: [
      { path: '', component: PagosLista }
    ]
  }
  ,
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes)
  ]
})
export class AdminModule { }
