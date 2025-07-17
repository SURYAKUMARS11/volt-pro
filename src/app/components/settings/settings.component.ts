import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupabaseService, UserProfile } from '../../supabase.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  userName: string = '';
  userPhone: string = '';
  balance: number = 0;
  rechargeAmount: number = 0;
  withdrawalAmount: number = 0;

  constructor(
    private router: Router,
    private supabaseService: SupabaseService
  ) {}

  async ngOnInit() {
    // Get user data similar to home component
    const user = await this.supabaseService.getUser();

    if (user) {
      const userProfile = await this.supabaseService.getUserProfile(user.id);

      if (userProfile) {
        this.userName = userProfile.nickname || user.email || 'User';
        this.userPhone = userProfile.phone_number || 'N/A';
      } else {
        this.userName = user.email || 'User';
        this.userPhone = 'N/A';
      }
    }

    // Initialize amounts (these would come from your backend/database)
    this.balance = 0;
    this.rechargeAmount = 0;
    this.withdrawalAmount = 0;
  }

  getHiddenPhone(): string {
    if (this.userPhone && this.userPhone.length > 4) {
      return this.userPhone.slice(0, 6) + '*******' + this.userPhone.slice(-3);
    }
    return this.userPhone;
  }

  navigateToRecharge() {
    this.router.navigate(['/recharge']);
  }

  navigateToWithdrawal() {
    this.router.navigate(['/withdrawal']);
  }

  navigateToOrders() {
    this.router.navigate(['/orders']);
  }

  navigateToTeam() {
    this.router.navigate(['/team']);
  }

  navigateToVip() {
    // Will implement later
    alert('VIP section coming soon!');
  }

  navigateToBankCard() {
    // Will implement later
    alert('Bank Card section coming soon!');
  }

  navigateToHelpCentre() {
    // Will implement later
    alert('Help Centre coming soon!');
  }

  navigateToInfo() {
    // Will implement later
    alert('Info section coming soon!');
  }

  navigateToTradePassword() {
    // Will implement later
    alert('Trade Password section coming soon!');
  }

  navigateToPassword() {
    // Will implement later
    alert('Password section coming soon!');
  }

  async logout() {
    const confirmed = confirm('Are you sure you want to logout?');
    if (confirmed) {
      try {
        await this.supabaseService.client.auth.signOut();
        this.router.navigate(['/signin']);
      } catch (error) {
        console.error('Logout error:', error);
        alert('Error logging out. Please try again.');
      }
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}