// nav.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NgIf, RouterLink],
  template: `
    <nav *ngIf="auth.isLoggedIn()">
      <a routerLink="/profile">Profile</a>
      <button (click)="auth.logout()">Logout</button>
    </nav>
    <nav *ngIf="!auth.isLoggedIn()">
      <a routerLink="/login">Login</a>
      <a routerLink="/register">Register</a>
    </nav>
  `
})
export class NavComponent {
  constructor(public auth: AuthService) {}
}