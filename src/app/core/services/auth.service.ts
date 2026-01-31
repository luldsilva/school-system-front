import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7195/api/auth';

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  login(userName: string, password: string) {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/login`, {
        UserName: userName,
        Password: password,
      })
      .pipe(
        tap((response) => {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', response.token);
          }
        }),
      );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }
}
