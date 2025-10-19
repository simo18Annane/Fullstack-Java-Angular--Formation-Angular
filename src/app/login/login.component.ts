import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit {

  user = new User();
  err : number = 0;
  message : string = "login ou mot de passe erronés..";

  constructor(private authService : AuthService, private router : Router) {}

  ngOnInit(): void {
      
  }

  onLoggedin() {
    /* console.log(this.user);
    let isValidUser : Boolean = this.authService.SignIn(this.user);
    if (isValidUser){
      this.router.navigate(['/']);
    } else {
      //alert('Login ou mot de passe incorrecte!');
      this.erreur=1;
    } */

    this.authService.login(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/']);
      },
      error: (err : any) => {
        this.err = 1;
        if (err.error.errorCause == "disabled")
          this.message = "L'utilisateur est désactivé !";
      }
    });
  }

}
