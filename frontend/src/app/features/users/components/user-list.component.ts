import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="page">
      <div class="page-header">
        <h2>Users</h2>
        <div>
          <a routerLink="/users/new" class="button">Create user</a>
          <button type="button" (click)="loadUsers()">Refresh</button>
        </div>
      </div>

      <table *ngIf="users().length; else noUsers" class="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let u of users()">
            <td>{{ u.id }}</td>
            <td>{{ u.firstName }}</td>
            <td>{{ u.lastName }}</td>
            <td>{{ u.email }}</td>
            <td>{{ u.phone }}</td>
            <td>
              <a [routerLink]="['/users', u.id, 'edit']" class="button">Edit</a>
              <button type="button" class="button secondary" (click)="onDelete(u.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <ng-template #noUsers>
        <p>No users found. Use Create user to add one.</p>
      </ng-template>
    </section>
  `
})
export class UserListComponent implements OnInit {
  users = signal<User[]>([]);

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersService.list().subscribe((data) => this.users.set(data));
  }

  onDelete(id?: number): void {
    if (!id) {
      return;
    }
    this.usersService.delete(id).subscribe(() => this.loadUsers());
  }
}
