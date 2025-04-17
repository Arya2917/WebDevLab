// src/app/test/test.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  template: `
    <div style="border: 2px solid green; padding: 1rem;">
      <h2>Test Component</h2>
      <p>This proves your routing is working!</p>
    </div>
  `,
  standalone: true
})
export class TestComponent {}