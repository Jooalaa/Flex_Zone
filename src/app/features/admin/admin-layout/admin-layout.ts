import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  navItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊', exact: true },
    { path: '/admin/users', label: 'Users', icon: '👥', exact: false },
    { path: '/admin/trainers', label: 'Trainers', icon: '🏋️', exact: false },
    { path: '/admin/plans', label: 'Workout Plans', icon: '📋', exact: false },
    { path: '/admin/classes', label: 'Classes', icon: '📅', exact: false },
  ];
}
