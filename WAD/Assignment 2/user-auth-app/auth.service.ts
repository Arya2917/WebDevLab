// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router) {}

  register(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.router.navigate(['/profile']);
  }

  login(credentials: any) {
    // In real app, verify credentials with backend
    localStorage.setItem('currentUser', JSON.stringify(credentials));
    this.router.navigate(['/profile']);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return !!localStorage.getItem('currentUser');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || null);
  }
}