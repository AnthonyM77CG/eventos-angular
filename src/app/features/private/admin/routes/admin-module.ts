import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from '../pages/dashboard/dashboard';
import { EspacioEvento } from '../pages/espacio-evento/espacio-evento';
import { ReservasInicio } from '../pages/reservas/reservas-inicio/reservas-inicio';
import { ReservasList } from '../pages/reservas/reservas-list/reservas-list';

const adminRoutes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'locales', component: EspacioEvento},
  { path: 'reservas', component: ReservasInicio,
    children:[
      {path: '', component: ReservasList}
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
