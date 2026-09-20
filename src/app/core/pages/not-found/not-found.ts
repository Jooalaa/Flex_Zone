import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div class="status-page">
      <h1>404</h1>
      <p>This page doesn't exist.</p>
      <a routerLink="/" class="btn-primary">Back to Home</a>
    </div>
  `,
})
export class NotFound {}
