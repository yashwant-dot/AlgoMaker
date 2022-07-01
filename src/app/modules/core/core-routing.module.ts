import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  MainComponent,
  AccountComponent,
  StratergyComponent,
  PositionComponent,
  TradeComponent,
  StratergyAddComponent,
  CryptoWalletComponent,
  CryptoKycComponent,
  CryptoLendingComponent,
  DashboardComponent,
  OrdersComponent,
  StratergyUpdateComponent,
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
      { path: 'account', component: AccountComponent },
      { path: 'position', component: PositionComponent },
      { path: 'trade', component: TradeComponent },
      {
        path: 'stratergy',
        component: StratergyComponent,
      },
      {
        path: 'stratergy/add',
        component: StratergyAddComponent,
      },
      {
        path: 'stratergy/update',
        component: StratergyUpdateComponent,
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
