import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StrategyRoutingModule } from './strategy-routing.module';
import {
  StrategyComponent,
  StrategyAddComponent,
  StrategyUpdateComponent,
} from './containers';
import { StrategyFormComponent } from './components';
import { MaterialModule } from '../../material/material.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MANAGE_STRATEGY_FEATURE_KEY, reducers, effects } from './+state';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    StrategyComponent,
    StrategyAddComponent,
    StrategyUpdateComponent,
    StrategyFormComponent,
  ],
  imports: [
    CommonModule,
    StrategyRoutingModule,
    MaterialModule,
    SharedModule,
    StoreModule.forFeature(MANAGE_STRATEGY_FEATURE_KEY, reducers),
    EffectsModule.forFeature(effects),
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
})
export class StrategyModule {}
