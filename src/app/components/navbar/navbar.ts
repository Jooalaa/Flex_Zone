import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class NavbarComponent {
  auth = inject(AuthService);
  router = inject(Router)

  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
