import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  phoneNumber: string = '';
  password: string = '';

  constructor(private router: Router) {}

  signin() {
    if (this.phoneNumber.length === 10 && this.password.length >= 6) {
      localStorage.setItem('userPhone', this.phoneNumber);
      localStorage.setItem('userName', 'User');
      this.router.navigate(['/home']);
    } else {
      alert('Please enter valid phone number and password!');
    }
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}