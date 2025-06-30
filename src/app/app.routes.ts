import { Routes } from '@angular/router';
import { NoEncontrado } from './features/public/no-encontrado/no-encontrado';
import { Inicio } from './features/public/inicio/inicio';
import { Locales } from './features/public/locales/locales';
import { Nosotros } from './features/public/nosotros/nosotros';
import { Contacto } from './features/public/contacto/contacto';
import { Login } from './features/auth/pages/login/login';
import { Register } from './features/auth/pages/register/register';
import { Dashboard } from './features/private/dashboard/dashboard';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    { path: 'inicio', component: Inicio },
    { path: 'locales', component: Locales },
    { path: 'nosotros', component: Nosotros },
    { path: 'contacto', component: Contacto },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
    { path: '', redirectTo: 'inicio', pathMatch:"full"},
    { path: '**', component: NoEncontrado }
];
