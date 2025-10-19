import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit{

  public user = new User();
  confirmPassword? : string;
  myForm! : FormGroup;
  err : any;
  loading : boolean = false;

  constructor(private formBuilder : FormBuilder, private authService : AuthService, private router : Router, private toastr : ToastrService) {}

  ngOnInit(): void {
      this.myForm = this.formBuilder.group({
        username : ['', [Validators.required]],
        email : ['', [Validators.required, Validators.email]],
        password : ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword : ['', [Validators.required]]
      });
  }

  onRegister() {
    this.loading = true;
    console.log(this.user);
    this.authService.registerUser(this.user).subscribe({
      next:(res)=>{
        this.authService.setRegistredUser(this.user);
        this.loading = false;
        this.toastr.success('Veuillez confirmer votre email', 'Confirmation');
        this.router.navigate(["/verifEmail"]);
      },
      error:(err : any)=>{
        this.loading = false;
        if(err.status = 400) {
          this.err = err.error.message;
        }
      }
    });
  }

}
