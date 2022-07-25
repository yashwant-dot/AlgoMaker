import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ZerodhaComponent, AccountsComponent } from './containers';
import { ZerodhaFormComponent } from './components';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AccountReducer, AccountEffects } from './+state';

const routes: Routes = [
  {
    path: '',
    component: AccountsComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [ZerodhaComponent, ZerodhaFormComponent, AccountsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('account', AccountReducer),
    EffectsModule.forFeature([AccountEffects]),
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AccountModule {}
