import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-withdrawal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.css']
})
export class WithdrawalComponent {
  withdrawalAmount: string = '';
  selectedMethod: string = '';
  accountDetails: any = {};

  availableBalance: number = 0;
  minimumWithdrawal: number = 100;

  withdrawalMethods = [
    { id: 'bank', name: 'Bank Transfer', icon: 'fas fa-university', fee: 0 },
    { id: 'upi', name: 'UPI Transfer', icon: 'fas fa-mobile-alt', fee: 0 },
    { id: 'paytm', name: 'Paytm Wallet', icon: 'fas fa-wallet', fee: 5 }
  ];

  recentWithdrawals = [
    { amount: 2500, date: '2024-01-15', status: 'completed', method: 'Bank Transfer' },
    { amount: 1000, date: '2024-01-10', status: 'pending', method: 'UPI Transfer' },
    { amount: 500, date: '2024-01-05', status: 'completed', method: 'Paytm Wallet' }
  ];

  constructor(private router: Router) {}

  selectMethod(method: string) {
    this.selectedMethod = method;
  }

  getMethodFee() {
    const method = this.withdrawalMethods.find(m => m.id === this.selectedMethod);
    return method ? method.fee : 0;
  }

  getFinalAmount() {
    const amount = parseInt(this.withdrawalAmount) || 0;
    const fee = this.getMethodFee();
    return amount - fee;
  }

  processWithdrawal() {
    const amount = parseInt(this.withdrawalAmount);
    if (amount >= this.minimumWithdrawal && this.selectedMethod) {
      alert(`Withdrawal request of ₹${amount} submitted successfully!`);
    } else {
      alert('Please enter valid amount and select withdrawal method');
    }
  }
parseIntValue(value: string | null): number {
  return parseInt(value ?? '0', 10);
}
  goBack() {
    this.router.navigate(['/home']);
  }
}