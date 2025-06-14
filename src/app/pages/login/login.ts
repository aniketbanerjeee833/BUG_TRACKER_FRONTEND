import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true, // <-- Add this line
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'] // <-- Use plural
})
export class Login {
  loginForm: FormGroup;
  error = '';
  isLoginMode = "login";

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    //  Initialize form here
    this.loginForm = this.fb.group({
      username: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  toggleMode(mode: 'login' | 'signup') {
    // this.isLoginMode = !this.isLoginMode;
    this.isLoginMode = mode;
    this.error = '';
    this.loginForm.reset();
  }

  submit() {
    if (this.loginForm.invalid) return;
    const { username, email, password } = this.loginForm.value;
    if (this.isLoginMode== "login") {
      this.auth.login(email!, password!).subscribe({
        next: res => {
          const role = res.user.role;
          this.router.navigate([role === 'ADMIN' ? '/bugs' : '/home']);
        },
        error: err => this.error = err.error?.error || 'Login failed'
      });
    } else if( this.isLoginMode == "signup") {
      this.auth.signup(username!, email!, password!).subscribe({
        next: () => {
          this.isLoginMode = "login";
          this.loginForm.patchValue({ email, password: '' });
        },
        error: err => this.error = err.error?.error || 'Signup failed'
      });
    }
  }
}