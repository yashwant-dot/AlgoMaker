import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import {
  MainComponent,
  PositionComponent,
  TradeComponent,
  AccountComponent,
  CryptoWalletComponent,
  CryptoKycComponent,
  CryptoLendingComponent,
  DashboardComponent,
  InvoicesDetailsComponent,
  InvoicesListComponent,
  ContactsDetailsComponent,
  ContactsListComponent,
} from './containers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenavComponent } from './components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgApexchartsModule } from 'ng-apexcharts';
@NgModule({
  declarations: [
    MainComponent,
    SidenavComponent,
    PositionComponent,
    TradeComponent,
    AccountComponent,
    CryptoWalletComponent,
    DashboardComponent,
    CryptoWalletComponent,
    CryptoKycComponent,
    CryptoLendingComponent,
    InvoicesDetailsComponent,
    InvoicesListComponent,
    ContactsDetailsComponent,
    ContactsListComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgApexchartsModule,
  ],
})
export class CoreModule {}
