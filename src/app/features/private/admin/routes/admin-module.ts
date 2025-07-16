import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from '../pages/dashboard/dashboard';
import { ReservasInicio } from '../pages/reservas/reservas-inicio/reservas-inicio';
import { ReservasList } from '../pages/reservas/reservas-list/reservas-list';
import { EspacioEventoInicio } from '../pages/espacio-evento/espacio-evento-inicio/espacio-evento-inicio';
import { EspacioEventoList } from '../pages/espacio-evento/espacio-evento-list/espacio-evento-list';
import { EspacioEventoForm } from '../pages/espacio-evento/espacio-evento-form/espacio-evento-form';

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
    path: 'reservas', component: ReservasInicio,
    children: [
      { path: '', component: ReservasList }
    ]
  },
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
