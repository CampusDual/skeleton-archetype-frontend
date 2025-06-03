import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username = '';
  message = '';
  isLoggedIn!: boolean;

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.authService.getLoggedInObservable().subscribe(isLogged => {
      this.isLoggedIn = isLogged;
      this.username = this.authService.getUsername() ?? '';
    });
  }

  publicRequest() {
    this.http.get('http://localhost:30030/test/all', { responseType: 'text' })
      .subscribe(res => this.message = res);
  }

  privateRequest() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get('http://localhost:30030/test/user', { headers, responseType: 'text' })
      .subscribe(
        res => this.message = res,
        err => this.message = 'Not authorized'
      );
  }
}
