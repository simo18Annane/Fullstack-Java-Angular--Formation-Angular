import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'MesProduits';

  constructor(public authService : AuthService, private router : Router) {}

  ngOnInit(): void {
      this.authService.loadToken();
      if (this.authService.getToken()==null || this.authService.isTokenExpired()) {
        this.router.navigate(['/login']);
      }
  }

  onLogout() {
    this.authService.logout();
  }
}
