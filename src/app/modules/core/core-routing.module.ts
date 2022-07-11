import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  MainComponent,
  AccountComponent,
  PositionComponent,
  TradeComponent,
  CryptoWalletComponent,
  CryptoKycComponent,
  CryptoLendingComponent,
  DashboardComponent,
  OrdersComponent,
  InvoicesDetailsComponent,
  InvoicesListComponent,
  ContactsDetailsComponent,
  ContactsListComponent,
} from './containers';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'account',
        loadChildren: () =>
          import('./account/account.module').then((m) => m.AccountModule),
      },
      { path: 'position', component: PositionComponent },
      { path: 'trade', component: TradeComponent },
      {
        path: 'strategy',
        loadChildren: () =>
          import('./strategy/strategy.module').then((m) => m.StrategyModule),
      },
      {
        path: 'crypto/wallet',
        component: CryptoWalletComponent,
      },
      {
        path: 'crypto/kyc',
        component: CryptoKycComponent,
      },
      {
        path: 'crypto/lending',
        component: CryptoLendingComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'invoices',
        component: InvoicesListComponent,
      },
      {
        path: 'invoices/details',
        component: InvoicesDetailsComponent,
      },
      {
        path: 'contacts',
        component: ContactsListComponent,
      },
      {
        path: 'contacts/details',
        component: ContactsDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
