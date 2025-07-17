import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-investment-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './investment-detail.component.html',
  styleUrls: ['./investment-detail.component.css']
})
export class InvestmentDetailComponent implements OnInit {
  plan: any = {};
  quantity: number = 1;
  userBalance: number = 0;
  
  constructor(public router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.plan = navigation.extras.state['plan'];
    }
  }

  ngOnInit() {
    this.userBalance = 0; // Get from service
    
    // If no plan data, redirect back
    if (!this.plan.id) {
      this.router.navigate(['/home']);
    }
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

getTotalInvestment() {
  return this.plan?.investment ? this.plan.investment * this.quantity : 0;
}

getTotalDailyIncome() {
  return this.plan?.dailyIncome ? this.plan.dailyIncome * this.quantity : 0;
}

getTotalReturn() {
  return this.plan?.total ? this.plan.total * this.quantity : 0;
}

  canAfford() {
    return this.userBalance >= this.getTotalInvestment();
  }

  proceedToInvest() {
    if (this.canAfford()) {
      alert(`Investment successful!\nPlan: ${this.plan.title}\nQuantity: ${this.quantity}\nTotal Investment: ₹${this.getTotalInvestment()}`);
      this.router.navigate(['/home']);
    } else {
      alert('Insufficient balance! Please recharge your wallet.');
      this.router.navigate(['/recharge']);
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}