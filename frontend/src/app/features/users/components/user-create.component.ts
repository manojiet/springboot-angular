import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserFormComponent } from './user-form.component';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [CommonModule, UserFormComponent, RouterModule],
  template: `
    <section class="page">
      <div class="page-header">
        <h2>Create user</h2>
        <a routerLink="/users" class="button">Back to users</a>
      </div>
      <app-user-form (save)="create($event)" (cancel)="cancel()"></app-user-form>
    </section>
  `
})
export class UserCreateComponent {
  constructor(private usersService: UsersService, private router: Router) {}

  create(user: any) {
    console.log('UserCreate create called', user);
    this.usersService.create(user).subscribe({
      next: () => this.router.navigate(['/users']),
      error: (err) => {
        console.error('UserCreate create failed', err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }
}
