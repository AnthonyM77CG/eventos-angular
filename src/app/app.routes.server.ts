import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'admin/locales/editar/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'admin/planes/editar/:id',
    renderMode: RenderMode.Server
  }
];
