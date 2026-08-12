import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list.component';

export const usersRoutes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'new', loadComponent: () => import('./components/user-create.component').then(m => m.UserCreateComponent) },
  { path: ':id/edit', loadComponent: () => import('./components/user-edit.component').then(m => m.UserEditComponent) }
];
