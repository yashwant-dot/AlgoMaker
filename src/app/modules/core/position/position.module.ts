import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PositionComponent } from './containers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PositionEffects, PositionReducer } from './+state';

const routes: Routes = [
  {
    path: '',
    component: PositionComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [PositionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('position', PositionReducer),
    EffectsModule.forFeature([PositionEffects]),
  ],
})
export class PositionModule {}
