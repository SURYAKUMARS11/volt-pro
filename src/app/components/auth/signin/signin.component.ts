import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../../supabase.service';


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  loginPhoneNumber: string = '';
  loginPassword: string = '';
  message: string = '';
  isSuccess: boolean = false;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private supabaseService: SupabaseService
  ) {}

  private displayMessage(msg: string, success: boolean = false) {
    this.message = msg;
    this.isSuccess = success;
    setTimeout(() => {
      this.message = '';
    }, 5000);
  }

  async signIn() {
    this.message = '';
    this.isLoading = true;
    this.isSuccess = false;

    if (this.loginPhoneNumber.length !== 10 || !this.loginPassword) {
      this.displayMessage('Please enter valid phone number and password.', false);
      this.isLoading = false;
      return;
    }

    try {
      this.displayMessage('Signing in...', true);
      const { data, error } = await this.supabaseService.client.auth.signInWithPassword({
        phone: `+91${this.loginPhoneNumber}`,
        password: this.loginPassword
      });

      if (error) {
        throw error;
      }

      this.displayMessage('Signed in successfully!', true);
      console.log('User logged in:', data.user);
      this.router.navigate(['/home']);

    } catch (error: any) {
      this.displayMessage(`Login failed: ${error.message}`, false);
      console.error('Login error:', error);
    } finally {
      this.isLoading = false;
    }
  }

//   async signIn() {
//   this.isLoading = true;

//   // TEMP: Bypass login validation and Supabase
//   this.displayMessage('Bypassing login... Redirecting to Home.', true);
//   console.log('Bypassing login. Redirecting to Home.');
//   await new Promise(resolve => setTimeout(resolve, 1000)); // Optional delay

//   this.router.navigate(['/home']);
//   this.isLoading = false;
// }
  goToSignup() {
    this.router.navigate(['/signup']);
  }
}