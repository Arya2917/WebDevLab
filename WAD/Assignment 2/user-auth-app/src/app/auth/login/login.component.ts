import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2 class="login-title">Welcome Back</h2>
        
        <div class="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              class="form-input"
              placeholder="Enter your email"
              #email>
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              class="form-input"
              placeholder="Enter your password"
              #password>
          </div>
          
          <button class="login-button" (click)="login(email.value, password.value)">
            Sign In
          </button>
          
          <div *ngIf="error" class="error-message">
            {{ error }}
          </div>
        </div>
        
        <div class="login-footer">
          <span>Don't have an account?</span>
          <a routerLink="/register" class="signup-link">Sign up</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f5f5f5;
      padding: 20px;
    }
    
    .login-card {
      width: 100%;
      max-width: 400px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      padding: 2rem;
    }
    
    .login-title {
      text-align: center;
      color: #333;
      margin-bottom: 1.5rem;
      font-size: 1.8rem;
    }
    
    .login-form {
      margin-bottom: 1.5rem;
    }
    
    .form-group {
      margin-bottom: 1.2rem;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #555;
      font-weight: 500;
    }
    
    .form-input {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }
    
    .form-input:focus {
      outline: none;
      border-color: #4a90e2;
    }
    
    .login-button {
      width: 100%;
      padding: 0.8rem;
      background-color: #4a90e2;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    
    .login-button:hover {
      background-color: #3a7bc8;
    }
    
    .error-message {
      color: #e74c3c;
      margin-top: 1rem;
      text-align: center;
      font-size: 0.9rem;
    }
    
    .login-footer {
      text-align: center;
      color: #666;
      font-size: 0.9rem;
    }
    
    .signup-link {
      color: #4a90e2;
      text-decoration: none;
      margin-left: 0.5rem;
      font-weight: 500;
    }
    
    .signup-link:hover {
      text-decoration: underline;
    }
  `]
})
export class LoginComponent {
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login(email: string, password: string) {
    if (this.auth.login(email, password)) {
      this.router.navigate(['/profile']);
    } else {
      this.error = 'Invalid email or password';
    }
  }
}