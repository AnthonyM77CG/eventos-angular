import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header-admin',
  imports: [RouterLink],
  templateUrl: './header-admin.html',
  styleUrl: './header-admin.scss'
})
export class HeaderAdmin implements OnInit {
  private authService = inject(AuthService)
  protected username: string | null = null

  ngOnInit(): void {
    this.username = this.authService.getUsernameLogin()
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion()
  }

}
