import { ContactUs } from './components/contact-us/contact-us';
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home').then((m) => m.Home),
  },
  {
    path: 'about',
    loadComponent: () => import('./components/about-as/about-as').then((m) => m.AboutAs),
  },
  {
    path: 'contact-us',
    loadComponent: () => import('./components/contact-us/contact-us').then((m) => m.ContactUs),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then((m) => m.Register),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./features/user/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () => import('./features/user/profile/profile').then((m) => m.Profile),
  },
  {
    path: 'plans',
    canActivate: [authGuard],
    loadComponent: () => import('./features/user/plans/plans').then((m) => m.Plans),
  },
  {
    path: 'classes',
    canActivate: [authGuard],
    loadComponent: () => import('./features/user/classes/classes').then((m) => m.Classes),
  },

  {
    path: 'supplement-store',
    canActivate: [authGuard],
    loadComponent: () => import('./features/user/supplement-store/supplement-store').then((m) => m.SupplementStore),
  },
  {
    path: 'nutrition',
    canActivate: [authGuard],
    loadComponent: () => import('./features/user/nutrition/nutrition').then((m) => m.Nutrition),
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => import('./features/admin/admin-layout/admin-layout').then((m) => m.AdminLayout),
    children: [
      { path: '', loadComponent: () => import('./features/admin/dashboard/admin-dashboard').then((m) => m.AdminDashboard) },
      { path: 'users', loadComponent: () => import('./features/admin/users/admin-users').then((m) => m.AdminUsers) },
      { path: 'trainers', loadComponent: () => import('./features/admin/trainers/admin-trainers').then((m) => m.AdminTrainers) },
      { path: 'plans', loadComponent: () => import('./features/admin/plans/admin-plans').then((m) => m.AdminPlans) },
      { path: 'classes', loadComponent: () => import('./features/admin/classes/admin-classes').then((m) => m.AdminClasses) },
    ],
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./core/pages/unauthorized/unauthorized').then((m) => m.Unauthorized),
  },
  {
    path: '**',
    loadComponent: () => import('./core/pages/not-found/not-found').then((m) => m.NotFound),
  },
];
