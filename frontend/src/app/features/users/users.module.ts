import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { usersRoutes } from './users-routing.module';
import { UserListComponent } from './components/user-list.component';

@NgModule({
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, RouterModule.forChild(usersRoutes), UserListComponent],
  declarations: [],
})
export class UsersModule {}
