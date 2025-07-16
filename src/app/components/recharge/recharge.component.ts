import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recharge',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent {
  selectedAmount: number = 0;
  customAmount: string = '';
  selectedMethod: string = '';

  quickAmounts = [100, 500, 1000, 2000, 5000, 10000];

  paymentMethods = [
    { id: 'upi', name: 'UPI Payment', icon: 'fas fa-mobile-alt', popular: true },
    { id: 'card', name: 'Credit/Debit Card', icon: 'fas fa-credit-card', popular: false },
    { id: 'netbanking', name: 'Net Banking', icon: 'fas fa-university', popular: false },
    { id: 'wallet', name: 'Digital Wallet', icon: 'fas fa-wallet', popular: true }
  ];

  constructor(private router: Router) {}

  selectAmount(amount: number) {
    this.selectedAmount = amount;
    this.customAmount = '';
  }

  onCustomAmountChange() {
    if (this.customAmount) {
      this.selectedAmount = parseInt(this.customAmount);
    }
  }

  selectPaymentMethod(method: string) {
    this.selectedMethod = method;
  }

  proceedToPayment() {
    if (this.selectedAmount > 0 && this.selectedMethod) {
      alert(`Processing payment of ₹${this.selectedAmount} via ${this.selectedMethod}`);
    } else {
      alert('Please select amount and payment method');
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}