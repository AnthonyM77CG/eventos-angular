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
import { TarifasForm } from '../pages/tarifas/tarifas-form/tarifas-form';
import { TarifasInicio } from '../pages/tarifas/tarifas-inicio/tarifas-inicio';
import { TarifasList } from '../pages/tarifas/tarifas-list/tarifas-list';

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
  , {
    path: 'tarifas',
    component: TarifasInicio,
    children: [
      { path: '', component: TarifasList },
      { path: 'agregar', component: TarifasForm },
      { path: 'editar/:id', component: TarifasForm }
    ]
  }
  ,
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
