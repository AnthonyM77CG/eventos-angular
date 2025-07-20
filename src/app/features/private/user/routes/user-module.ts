import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReservasForm } from '../pages/reservas/reservas-form/reservas-form';
import { ReservasList } from '../pages/reservas/reservas-list/reservas-list';
import { ReservasInicio } from '../pages/reservas/reservas-inicio/reservas-inicio';

const userRoutes: Routes = [
  {
    path: 'reservas', component: ReservasInicio,
    children: [
      { path: '', component: ReservasList },
      { path: 'agregar', component: ReservasForm }
    ]
  },
  { path: '', redirectTo: 'reservas', pathMatch: 'full' }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes)
  ]
})
export class UserModule { }
