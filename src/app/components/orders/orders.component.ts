import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  activeTab: string = 'all';

  orders = [
    {
      id: 'ORD001',
      type: 'investment',
      plan: 'VIP 1 Daily Plan',
      amount: 500,
      status: 'completed',
      date: '2024-01-15',
      dailyIncome: 200,
      duration: 5,
      progress: 100
    },
    {
      id: 'ORD002',
      type: 'investment',
      plan: 'VIP 2 Daily Plan',
      amount: 1500,
      status: 'active',
      date: '2024-01-10',
      dailyIncome: 250,
      duration: 10,
      progress: 60
    },
    {
      id: 'ORD003',
      type: 'withdrawal',
      plan: 'Bank Transfer',
      amount: 2500,
      status: 'pending',
      date: '2024-01-14',
      dailyIncome: 0,
      duration: 0,
      progress: 0
    },
    {
      id: 'ORD004',
      type: 'recharge',
      plan: 'Wallet Recharge',
      amount: 1000,
      status: 'completed',
      date: '2024-01-12',
      dailyIncome: 0,
      duration: 0,
      progress: 0
    }
  ];

  constructor(private router: Router) {}

  switchTab(tab: string) {
    this.activeTab = tab;
  }

  getFilteredOrders() {
    if (this.activeTab === 'all') {
      return this.orders;
    }
    return this.orders.filter(order => {
      if (this.activeTab === 'investment') return order.type === 'investment';
      if (this.activeTab === 'withdrawal') return order.type === 'withdrawal';
      if (this.activeTab === 'recharge') return order.type === 'recharge';
      return true;
    });
  }

  getOrderIcon(type: string) {
    switch (type) {
      case 'investment': return 'fas fa-chart-line';
      case 'withdrawal': return 'fas fa-money-bill-wave';
      case 'recharge': return 'fas fa-credit-card';
      default: return 'fas fa-file-alt';
    }
  }

  getStatusColor(status: string) {
    switch (status) {
      case 'completed': return 'completed';
      case 'active': return 'active';
      case 'pending': return 'pending';
      case 'cancelled': return 'cancelled';
      default: return 'pending';
    }
  }

  viewOrderDetails(order: any) {
    alert(`Order Details:\nID: ${order.id}\nPlan: ${order.plan}\nAmount: ₹${order.amount}\nStatus: ${order.status}`);
  }

  floor(value: number): number {
  return Math.floor(value);
}

  goBack() {
    this.router.navigate(['/home']);
  }
}