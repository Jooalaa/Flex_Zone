import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  imports: [RouterLink],
  template: `
    <div class="status-page">
      <h1>403</h1>
      <p>You don't have permission to access this page.</p>
      <a routerLink="/" class="btn-primary">Back to Home</a>
    </div>
  `,
})
export class Unauthorized {}
