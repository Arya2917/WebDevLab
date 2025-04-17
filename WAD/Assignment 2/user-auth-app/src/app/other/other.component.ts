// src/app/other/other.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-other',
  template: `
    <div style="border: 2px solid purple; padding: 1rem;">
      <h2>Other Component</h2>
      <p>This is the other page content!</p>
      <a routerLink="/test">Back to Test</a>
    </div>
  `,
  standalone: true
})
export class OtherComponent {}