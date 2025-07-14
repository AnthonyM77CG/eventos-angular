import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-user',
  imports: [RouterLink],
  templateUrl: './header-user.html',
  styleUrl: './header-user.scss'
})
export class HeaderUser implements OnInit {
  private authService = inject(AuthService)
  protected userName: string | null = null

  ngOnInit(): void {
    this.userName = this.authService.getUsernameLogin()
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion()
  }

}
