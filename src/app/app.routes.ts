// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { SplashComponent } from './components/splash/splash.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { RechargeComponent } from './components/recharge/recharge.component';
import { WithdrawalComponent } from './components/withdrawal/withdrawal.component';
import { TeamComponent } from './components/team/team.component';
import { OrdersComponent } from './components/orders/orders.component';

export const routes = [
  { path: '', component: SplashComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'recharge', component: RechargeComponent },
  { path: 'withdrawal', component: WithdrawalComponent },
  { path: 'team', component: TeamComponent },
  { path: 'orders', component: OrdersComponent },
  { path: '**', redirectTo: '' }
];
