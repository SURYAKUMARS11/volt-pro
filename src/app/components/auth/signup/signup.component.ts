import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  nickname: string = '';
  phoneNumber: string = '';
  password_signup: string = '';
  confirmPassword_signup: string = '';
  message: string = '';
  isSuccess: boolean = false;
  isLoading: boolean = false;

  constructor(
    private router: Router,
  ) {}

  private displayMessage(msg: string, success: boolean = false) {
    this.message = msg;
    this.isSuccess = success;
    setTimeout(() => {
      this.message = '';
    }, 5000);
  }

  async signup() {
    this.message = '';
    this.isLoading = true;
    this.isSuccess = false;

    // Basic client-side validation
    if (!this.nickname.trim()) {
      this.displayMessage('Nickname is required.', false);
      this.isLoading = false;
      return;
    }
    if (this.phoneNumber.length !== 10) {
      this.displayMessage('Please enter a valid 10-digit mobile number.', false);
      this.isLoading = false;
      return;
    }
    if (this.password_signup.length < 6) {
      this.displayMessage('Password must be at least 6 characters long.', false);
      this.isLoading = false;
      return;
    }
    if (this.password_signup !== this.confirmPassword_signup) {
      this.displayMessage('Passwords do not match!', false);
      this.isLoading = false;
      return;
    }

    try {
      this.displayMessage('Creating account...', true);
      const backendResponse = await fetch(`${environment.backendApiUrl}/create-supabase-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nickname: this.nickname,
          phoneNumber: `+91${this.phoneNumber}`,
          password: this.password_signup
        })
      });

      const responseData = await backendResponse.json();

      if (!backendResponse.ok) {
        // <<< NEW: Improved error handling based on backend status and message
        if (backendResponse.status === 409) {
          this.displayMessage(responseData.error || 'This phone number is already registered.', false);
        } else {
          this.displayMessage(responseData.error || 'Failed to create account. Please try again.', false);
        }
        throw new Error(responseData.error || 'Backend error.');
      }

      this.displayMessage('Account created successfully! You can now sign in.', true);
      this.router.navigate(['/signin']);

    } catch (error: any) {
      // The displayMessage is already called inside the if/else block above for backend.ok === false
      // Only show generic error if it's a network error (e.g., backend not reachable)
      if (!this.message) { // Check if message was already set by a specific backend error
         this.displayMessage(`Error creating account: ${error.message || 'Network error.'}`, false);
      }
      console.error('Error creating account:', error);
    } finally {
      this.isLoading = false;
    }
  }

  goToSignin() {
    this.router.navigate(['/signin']);
  }
}