import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SupabaseService, UserProfile } from '../../supabase.service';

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
  currentNotificationIndex: number = 0;
  isLoading: boolean = true;
  errorMessage: string | null = null;
  showInvestmentPopup: boolean = false;
  selectedPlan: any = null;
  investmentQuantity: number = 1;

  notifications = [
    {
      name: 'Rajesh',
      amount: 2500,
      action: 'withdrawn',
      image: 'https://images.pexels.com/photos/3483098/pexels-photo-3483098.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      name: 'Priya',
      amount: 1500,
      action: 'earned profit',
      image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      name: 'Amit ',
      amount: 3000,
      action: 'invested',
      image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  
  constructor(
    // !!! CRITICAL: Ensure 'private' (or 'public') is here !!!
    private supabaseService: SupabaseService,
    private router: Router // Inject Router if you're using it for auth redirects
  ) {
    // This console log will help immediately confirm if the service is injected
    console.log('HomeComponent constructor called.');
    if (!this.supabaseService) {
      console.error('ERROR: SupabaseService is UNDEFINED immediately after injection in constructor!');
      // In a real app, you might want to log this to an error tracking service
    } else {
      console.log('SUCCESS: SupabaseService is defined in constructor.');
    }
  }


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

 async ngOnInit() {
    this.balance = 0; // Initialize or fetch from other tables
    this.totalIncome = 0; // Initialize or fetch from other tables

    // 1. Get the authenticated user from Supabase Auth
    const user = await this.supabaseService.getUser();

    if (user) {
      // User is logged in, now fetch their profile data
      const userProfile = await this.supabaseService.getUserProfile(user.id);

      if (userProfile) {
        // Profile found, update component properties
        this.userName = userProfile.nickname || user.email || 'User'; // Fallback
        this.userPhone = userProfile.phone_number || 'N/A'; // Fallback
      } else {
        // Profile not found in 'profiles' table for this user ID
        console.warn(`User profile not found in 'profiles' table for user ID: ${user.id}. 
                     Ensure RLS and profile creation logic is correct.`);
        this.userName = user.email || 'User'; // Fallback to email from auth.users
        this.userPhone = 'N/A'; // No profile phone, keep default
      }
    } else {
      // No user logged in
      console.log('No user logged in. Using default values.');
      // Optional: Redirect to login page if authentication is required for this page
      // this.router.navigate(['/login']); 
    }

    // Your existing component logic
    setTimeout(() => {
      this.showTelegramPopup = true;
    }, 1000);

    this.startNotificationSlider();
  }
  startNotificationSlider() {
    setInterval(() => {
      this.currentNotificationIndex = (this.currentNotificationIndex + 1) % this.notifications.length;
    }, 4000);
  }

  getCurrentNotification() {
    return this.notifications[this.currentNotificationIndex];
  }

 getHiddenPhone(): string {
    if (this.userPhone && this.userPhone.length > 4) {
      // Example: show first 2 and last 3 digits like "91*******123"
      return this.userPhone.slice(0, 6) + '*******' + this.userPhone.slice(-3);
    }
    return this.userPhone; // If too short or "N/A", display as is
  }

  closeTelegramPopup() {
    this.showTelegramPopup = false;
  }

  joinTelegram() {
    window.open('https://t.me/voltearning', '_blank');
    this.closeTelegramPopup();
  }
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

  navigateToAbout() {
    this.router.navigate(['/about']);
  }

  navigateToSettings() {
    this.router.navigate(['/settings']);
  }
  switchPlanType(type: string) {
    this.activePlanType = type;
  }
 openCustomerService() {
    alert('Customer service coming soon!');
  }
getCurrentPlans() {
  return this.activePlanType === 'daily' ? this.dailyPlans : this.advancedPlans;
}
  goToInvestmentDetail(plan: any) {
    this.selectedPlan = plan;
    this.investmentQuantity = 1;
    this.showInvestmentPopup = true;
  }

  closeInvestmentPopup() {
    this.showInvestmentPopup = false;
    this.selectedPlan = null;
    this.investmentQuantity = 1;
  }

  increaseQuantity() {
    this.investmentQuantity++;
  }

  decreaseQuantity() {
    if (this.investmentQuantity > 1) {
      this.investmentQuantity--;
    }
  }

  getTotalInvestment() {
    return this.selectedPlan ? this.selectedPlan.investment * this.investmentQuantity : 0;
  }

  canAffordInvestment() {
    return this.balance >= this.getTotalInvestment();
  }

  confirmInvestment() {
    if (this.canAffordInvestment()) {
      alert(`Investment successful!\nPlan: ${this.selectedPlan.title}\nQuantity: ${this.investmentQuantity}\nTotal Investment: ₹${this.getTotalInvestment()}`);
      this.closeInvestmentPopup();
    } else {
      alert('Insufficient balance! Please recharge your wallet.');
    }
  }

  navigateToInvite() {
    this.router.navigate(['/invite']);
  }
}