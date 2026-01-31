import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'students',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/students/students.component').then((m) => m.StudentsComponent),
  },
  {
    path: 'schools',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/schools/schools.component').then((m) => m.SchoolsComponent),
  },
];
