import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:30030';
  private tokenKey = 'authToken';
  private usernameKey = 'username';

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) { }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  login(username: string, password: string): Observable<any> {
    const credentials = btoa(`${username}:${password}`);

    const headers = new HttpHeaders({
      'Authorization': `Basic ${credentials}`
    });

    return this.http.post(`${this.baseUrl}/auth/signin`, {}, { headers, responseType: 'text' })
      .pipe(
        tap(token => {
          localStorage.setItem(this.tokenKey, token);
          localStorage.setItem(this.usernameKey, username);
          this.loggedIn.next(true);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.usernameKey);
    this.loggedIn.next(false);
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  getUsername(): string | null {
    return localStorage.getItem(this.usernameKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getLoggedInObservable(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
