import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OrdersReducer, OrdersEffects } from './+state';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './containers';
import { OrderTableComponent, OrderFiltersComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [OrdersComponent, OrderTableComponent, OrderFiltersComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('orders', OrdersReducer),
    EffectsModule.forFeature([OrdersEffects]),
    RouterModule.forChild(routes),
  ],
  providers: [DatePipe],
})
export class OrdersModule {}
