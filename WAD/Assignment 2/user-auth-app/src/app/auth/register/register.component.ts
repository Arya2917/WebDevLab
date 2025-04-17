import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="auth-container">
      <h2>Register</h2>
      <div class="auth-form">
        <input #email placeholder="Email" class="auth-input">
        <input #password type="password" placeholder="Password" class="auth-input">
        <button (click)="register(email.value, password.value)" class="auth-button">
          Register
        </button>
        <div *ngIf="error" class="error-message">{{error}}</div>
        <div class="auth-footer">
          Already have an account? <a routerLink="/login" class="auth-link">Login</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .auth-input {
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    .auth-button {
      padding: 0.75rem;
      background: #4285f4;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }
    .auth-button:hover {
      background: #3367d6;
    }
    .error-message {
      color: #d32f2f;
      margin-top: 0.5rem;
    }
    .auth-footer {
      margin-top: 1rem;
      text-align: center;
    }
    .auth-link {
      color: #4285f4;
      text-decoration: none;
    }
  `]
})
export class RegisterComponent {
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  register(email: string, password: string) {
    if (email && password) {
      if (this.auth.register(email, password)) {
        this.router.navigate(['/profile']);
      } else {
        this.error = 'Registration failed';
      }
    } else {
      this.error = 'Please fill all fields';
    }
  }
}