import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  password = '';
  repeatPassword = '';
  error = '';
  success = '';

  constructor(private http: HttpClient, private router: Router) { }

  register() {
    if (this.password !== this.repeatPassword) {
      this.error = 'Passwords not match.';
      return;
    }

    const newUser = {
      login: this.username,
      password: this.password,
      name: this.username
    };

    this.http.post('http://localhost:30030/auth/signup', newUser, { responseType: 'text' }).subscribe({
      next: () => {
        this.success = 'User register successfully';
        this.error = '';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: err => {
        this.error = 'User not registered.';
        this.success = '';
        console.error(err);
      }
    });

  }
}
