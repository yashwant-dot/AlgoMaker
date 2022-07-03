import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  StrategyAddComponent,
  StrategyComponent,
  StrategyUpdateComponent,
} from './containers';

const routes: Routes = [
  {
    path: '',
    component: StrategyComponent,
    pathMatch: 'full',
  },
  { path: 'add', component: StrategyAddComponent },
  { path: 'update', component: StrategyUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StrategyRoutingModule {}
