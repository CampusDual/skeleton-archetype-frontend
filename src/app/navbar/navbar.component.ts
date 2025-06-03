import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  username: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getLoggedInObservable().subscribe(isLogged => {
      this.isLoggedIn = isLogged;
      this.username = this.authService.getUsername();
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
