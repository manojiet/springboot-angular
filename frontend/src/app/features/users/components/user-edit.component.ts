import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserFormComponent } from './user-form.component';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, UserFormComponent, RouterModule],
  template: `
    <section class="page">
      <div class="page-header">
        <h2>Edit user</h2>
        <a routerLink="/users" class="button">Back to users</a>
      </div>
      <app-user-form *ngIf="user()" [user]="user()" (save)="update($event)" (cancel)="cancel()"></app-user-form>
      <p *ngIf="!user()">Loading user details…</p>
    </section>
  `
})
export class UserEditComponent implements OnInit {
  user = signal<User | null | undefined>(undefined);

  constructor(private route: ActivatedRoute, private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.usersService.get(id).subscribe({
      next: (u) => this.user.set(u),
      error: () => this.router.navigate(['/users'])
    });
  }

  update(user: User): void {
    if (!user.id) {
      return;
    }
    this.usersService.update(user.id, user).subscribe({
      next: () => this.router.navigate(['/users']),
      error: (err) => console.error('UserEdit update failed', err)
    });
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }
}
