import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponse, User } from '../models/auth.model';
import { HttpClient, httpResource, HttpResourceRef, HttpResourceRequest } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  http = inject(HttpClient);
  apibaseurl = environment.apiBaseUrl;
  user = signal<User | null>(null);
  router = inject(Router);

  loginStatus = signal<'loading' | 'success' | 'error' | 'idle'>('idle');

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apibaseurl}/api/Auth/login`, {
      email: email,
      password: password
    }, {
      withCredentials: true
    }).pipe(
      tap((userResponse) => this.setUser(userResponse)));
  }

  loadUser(): HttpResourceRef<User | undefined> {
    return httpResource<User>(() => {
      const request: HttpResourceRequest = {
        url: `${this.apibaseurl}/api/Auth/me`,
        withCredentials: true
      }
      return request;
    });
  }

  logout() {
    this.http.post<void>(`${this.apibaseurl}/api/Auth/Logout`, {}, {
      withCredentials: true
    }).subscribe({
      next: () => {
        this.setUser(null);
        this.router.navigate(['']);
      },
    });
  }

  setUser(updatedUser: User | null) {
    if (updatedUser) {
      this.user.set({
        email: updatedUser.email,
        roles: updatedUser.roles.map(r => r.toLowerCase())
      });
    } else {
      this.user.set(null);
    }

  }
}


