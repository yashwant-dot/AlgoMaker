import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import {
  MainComponent,
  StratergyComponent,
  PositionComponent,
  TradeComponent,
  AccountComponent,
  StratergyAddComponent,
  CryptoComponent,
  DashboardComponent,
  OrdersComponent,
  StratergyUpdateComponent,
} from './containers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenavComponent, StratergyFormComponent } from './components';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MANAGE_CORE_FEATURE_KEY, reducers, effects } from './+state';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [
    MainComponent,
    SidenavComponent,
    StratergyComponent,
    StratergyFormComponent,
    PositionComponent,
    TradeComponent,
    AccountComponent,
    StratergyAddComponent,
    CryptoComponent,
    DashboardComponent,
    OrdersComponent,
    StratergyUpdateComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    StoreModule.forFeature(MANAGE_CORE_FEATURE_KEY, reducers),
    EffectsModule.forFeature(effects),
  ],
})
export class CoreModule {}
