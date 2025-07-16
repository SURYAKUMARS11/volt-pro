import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName: string = '';
  userPhone: string = '';
  balance: number = 0;
  totalIncome: number = 0;
  showTelegramPopup: boolean = false;
  activePlanType: string = 'daily';

  constructor(private router: Router) {}

  dailyPlans = [
    {
      id: 1,
      title: 'VIP 1',
      investment: 500,
      dailyIncome: 200,
      days: 5,
      total: 1000,
      isActive: true,
      canPurchase: true,
      image: 'https://images.pexels.com/photos/3483098/pexels-photo-3483098.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'VIP 2',
      investment: 1500,
      dailyIncome: 250,
      days: 10,
      total: 2500,
      isActive: false,
      canPurchase: false,
      image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  advancedPlans = [
    {
      id: 3,
      title: 'Advanced VIP 1',
      investment: 2000,
      dailyIncome: 88,
      days: 36,
      total: 3168,
      isActive: false,
      canPurchase: false,
      image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      title: 'Advanced VIP 2',
      investment: 6000,
      dailyIncome: 366,
      days: 36,
      total: 13176,
      isActive: false,
      canPurchase: false,
      image: 'https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  ngOnInit() {
    this.userName = localStorage.getItem('userName') || 'User';
    this.userPhone = localStorage.getItem('userPhone') || '1234567890';
    this.balance = 0;
    this.totalIncome = 0;

    // Show telegram popup after a short delay
    setTimeout(() => {
      this.showTelegramPopup = true;
    }, 1000);
  }

  getHiddenPhone(): string {
    return this.userPhone.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2');
  }

  closeTelegramPopup() {
    this.showTelegramPopup = false;
  }

  joinTelegram() {
    window.open('https://t.me/voltearning', '_blank');
    this.closeTelegramPopup();
  }

  switchPlanType(type: string) {
    this.activePlanType = type;
  }

  investInPlan(plan: any) {
    if (plan.canPurchase) {
      alert(`Investing in ${plan.title} plan for ₹${plan.investment}!`);
    } else {
      alert('Please complete previous plans first!');
    }
  }

  getCurrentPlans() {
    return this.activePlanType === 'daily' ? this.dailyPlans : this.advancedPlans;
  }

  // Navigation methods
  navigateToRecharge() {
    this.router.navigate(['/recharge']);
  }

  navigateToWithdrawal() {
    this.router.navigate(['/withdrawal']);
  }

  navigateToTeam() {
    this.router.navigate(['/team']);
  }

  navigateToOrders() {
    this.router.navigate(['/orders']);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToInvest() {
    this.router.navigate(['/invest']);
  }

  navigateToInvite() {
    this.router.navigate(['/invite']);
  }

  navigateToSettings() {
    this.router.navigate(['/settings']);
  }

  openCustomerService() {
    alert('Customer Service - Coming Soon!');
  }
}