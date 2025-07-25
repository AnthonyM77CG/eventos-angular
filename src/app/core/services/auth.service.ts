import { inject, Injectable } from '@angular/core';
import { Token } from '../../features/auth/models/token';
import { Credencial } from '../../features/auth/models/credencial';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../features/auth/models/usuario';
import { jwtDecode } from 'jwt-decode';
import { DecodedRole } from '../../features/auth/models/decoded-token';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = `${environment.apiBaseUrl}/v1/auth`;
  private router = inject(Router);
  private http = inject(HttpClient);

  private isAuth = new BehaviorSubject<boolean>(this.hasToken());
  public isAuth$ = this.isAuth.asObservable();

  iniciarSesion(credenciales: Credencial): Observable<Token> {
    return this.http.post<Token>(`${this.URL}/authenticate`, credenciales).pipe(
      tap(resp => {
        this.almacenarTokens(resp)
        this.isAuth.next(true);
        const decoded = jwtDecode<DecodedRole>(resp.access_token);
        if (decoded.role) {
          localStorage.setItem('user_role', decoded.role);
          this.redirectSegunRol(decoded.role);
        }
      }));
  }

  private redirectSegunRol(role: string) {
    const route = role === 'ADMIN' ? '/admin' :
      role === 'USER' ? '/user' :
        '/inicio';
    this.router.navigate([route]);
  }

  registrarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.URL}/register`, usuario).pipe(
      tap(() => {
        this.router.navigate(['/login']);
      })
    );
  }

  cerrarSesion() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token')
    this.isAuth.next(false);
    this.router.navigate(['/login'])
  }

  private almacenarTokens(tokens: Token) {
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
  }

  getTokenAccess(): String | null {
    return localStorage.getItem('access_token')
  }

  getUserIdLogin(): number | null {
    const token = this.getTokenAccess();
    if (token) {
      try {
        const decoded = jwtDecode<DecodedRole>(token as string);
        return decoded.id || null;
      } catch (e) {
        console.error('Error decodificando el token para obtener el ID:', e);
        return null;
      }
    }
    return null;
  }

  getUsernameLogin(): string | null {
    const token = this.getTokenAccess();
    if (token) {
      try {
        const decoded = jwtDecode<DecodedRole>(token as string);
        return decoded.username || null;
      } catch (e) {
        console.error('Error decodificando el token para obtener el username:', e);
        return null;
      }
    }
    return null;
  }


  private hasToken(): boolean {
    return !!localStorage.getItem('access_token')
  }
}
