// src/app/types.ts
import { FormControl } from '@angular/forms';
// User credentials for login/register
export interface UserCredentials {
    email: string;
    password: string;
    name?: string; // Optional for registration
  }
  
  // Full user profile
  export interface UserProfile extends UserCredentials {
    id: string;
    createdAt: Date;
    lastLogin?: Date;
  }
  
  // Form control types
  export type FormControlsFor<T> = {
    [K in keyof T]: FormControl<T[K]>;
  };
  
  // API response types
  export interface AuthResponse {
    user: UserProfile;
    token: string;
  }
  
  export interface ErrorResponse {
    message: string;
    code: number;
    timestamp: string;
  }