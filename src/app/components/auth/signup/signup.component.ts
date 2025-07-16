import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  phoneNumber: string = '';
  otp: string = '';
  password: string = '';
  confirmPassword: string = '';
  showOtpField: boolean = false;
  otpSent: boolean = false;

  constructor(private router: Router) {}

  sendOtp() {
    if (this.phoneNumber.length === 10) {
      this.otpSent = true;
      this.showOtpField = true;
    }
  }

  verifyOtp() {
    if (this.otp.length === 6) {
      // Simulate OTP verification
      alert('OTP Verified Successfully!');
    }
  }

  signup() {
    if (this.password === this.confirmPassword && this.password.length >= 6) {
      localStorage.setItem('userPhone', this.phoneNumber);
      localStorage.setItem('userName', 'User');
      this.router.navigate(['/home']);
    } else {
      alert('Passwords do not match or are too short!');
    }
  }

  goToSignin() {
    this.router.navigate(['/signin']);
  }
}