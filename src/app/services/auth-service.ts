import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/user';
  public currentUser = new BehaviorSubject<any>(null);
constructor(private http: HttpClient, private router: Router) {
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    this.currentUser.next(JSON.parse(savedUser));
  }
}

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));
          this.currentUser.next(res.user);
        })
      );
  }

  signup(username: string, email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/register`, { username, email, password });
  }

  // logout() {
  //   localStorage.removeItem('token');
  //   this.currentUser.next(null);
  //   this.router.navigate(['/login']);
  // }
  logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user'); // ✅ remove user info
  this.currentUser.next(null);
  this.router.navigate(['/login']);
}


  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}