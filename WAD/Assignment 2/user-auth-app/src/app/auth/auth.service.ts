import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly AUTH_KEY = 'user-auth-data';

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(email: string, password: string): boolean {
    if (email === 'test@test.com' && password === 'password') {
      if (this.isBrowser) {
        localStorage.setItem(this.AUTH_KEY, JSON.stringify({ email }));
      }
      return true;
    }
    return false;
  }

  register(email: string, password: string): boolean {
    if (email && password) {
      if (this.isBrowser) {
        localStorage.setItem(this.AUTH_KEY, JSON.stringify({ email }));
      }
      return true;
    }
    return false;
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.AUTH_KEY);
    }
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isBrowser ? localStorage.getItem(this.AUTH_KEY) !== null : false;
  }

  getCurrentUser(): { email: string } | null {
    if (!this.isBrowser) return null;
    const user = localStorage.getItem(this.AUTH_KEY);
    return user ? JSON.parse(user) : null;
  }
}