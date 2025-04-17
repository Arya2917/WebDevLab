import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-container">
      <h2>Welcome {{auth.getCurrentUser()?.email}}!</h2>
      <button (click)="auth.logout()">Logout</button>
    </div>
  `
})
export class ProfileComponent {
  constructor(public auth: AuthService) {}
}