import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard {
  private readonly ROLES = {
    USER: 'usuario',
    ADMIN: 'admin'
  } as const;

  activeItem: string = 'rooms';
  currentRole: 'usuario' | 'admin' = this.ROLES.USER;
  userName: string = 'Axel Santander';
  isSidebarCollapsed: boolean = false;

  toggleRole(): void {
    this.currentRole = this.currentRole === this.ROLES.USER
      ? this.ROLES.ADMIN
      : this.ROLES.USER;
    this.setActiveItem(this.isAdmin ? 'manage' : 'rooms');
  }

  setActiveItem(item: string): void {
    this.activeItem = item;
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  logout(): void {
    console.log('Sesión cerrada');
  }

  get isAdmin(): boolean {
    return this.currentRole === this.ROLES.ADMIN;
  }

  get roleTitle(): string {
    return this.isAdmin ? 'Administrador' : 'Usuario';
  }

  get welcomeMessage(): string {
    return `Hola, ${this.userName.split(' ')[0]}`;
  }

  get sidebarWidth(): string {
    return '280px';
  }
}
