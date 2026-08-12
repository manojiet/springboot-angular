import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  // Use proxy-relative path in production/when proxying; when running the
  // frontend dev server directly on :4200 (no proxy), point to backend.
  private baseUrl = window.location.port === '4200' ? 'http://localhost:8080/api/v1/users' : '/api/v1/users';

  constructor(private http: HttpClient) {}

  list(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  get(id: number) {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  create(user: User) {
    console.log('UsersService create posting to', this.baseUrl, user);
    return this.http.post<User>(this.baseUrl, user);
  }

  update(id: number, user: User) {
    console.log('UsersService update posting to', `${this.baseUrl}/${id}`, user);
    return this.http.put<User>(`${this.baseUrl}/${id}`, user);
  }

  delete(id: number) {
    console.log('UsersService delete calling', `${this.baseUrl}/${id}`);
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
