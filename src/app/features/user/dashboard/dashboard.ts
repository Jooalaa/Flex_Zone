import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  authService = inject(AuthService)

  user = computed(() => this.authService.currentUserSignal());

  quickLinks = [
    { path: '/plans', icon: '🏋️', title: 'Workout Plans', desc: 'Browse and filter plans tailored to your level.' },
    { path: '/classes', icon: '📅', title: 'Book a Class', desc: 'Reserve a spot in Yoga, HIIT, Boxing and more.' },
    { path: '/assistant', icon: '🍎', title: 'Nutrition Planner', desc: 'Personalized nutrition plans built around your fitness goal.' },
    { path: '/profile', icon: '👤', title: 'My Profile', desc: 'View and update your account details.' },
  ];
}
