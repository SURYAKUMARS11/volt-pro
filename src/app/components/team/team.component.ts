import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {
  referralCode: string = 'VOLT2024ABC';
  totalReferrals: number = 15;
  totalEarnings: number = 2500;
  todayReferrals: number = 3;

  teamMembers = [
    { name: 'Rajesh Kumar', phone: '98765****1', joinDate: '2024-01-15', status: 'active', earnings: 500 },
    { name: 'Priya Sharma', phone: '98765****2', joinDate: '2024-01-14', status: 'active', earnings: 300 },
    { name: 'Amit Singh', phone: '98765****3', joinDate: '2024-01-13', status: 'inactive', earnings: 150 },
    { name: 'Sneha Patel', phone: '98765****4', joinDate: '2024-01-12', status: 'active', earnings: 750 },
    { name: 'Rohit Gupta', phone: '98765****5', joinDate: '2024-01-11', status: 'active', earnings: 200 }
  ];

  constructor(private router: Router) {}

  copyReferralCode() {
    navigator.clipboard.writeText(this.referralCode).then(() => {
      alert('Referral code copied to clipboard!');
    });
  }

  shareReferralLink() {
    const message = `Join Volt and start earning daily! Use my referral code: ${this.referralCode}. Download now: https://volt-app.com`;
    if (navigator.share) {
      navigator.share({
        title: 'Join Volt - Earn Money Daily',
        text: message,
        url: 'https://volt-app.com'
      });
    } else {
      navigator.clipboard.writeText(message).then(() => {
        alert('Referral link copied to clipboard!');
      });
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}