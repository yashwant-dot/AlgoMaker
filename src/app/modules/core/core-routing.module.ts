import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  MainComponent,
  AccountComponent,
  StratergyComponent,
  PositionComponent,
  TradeComponent,
  StratergyAddComponent,
  CryptoComponent,
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
        path: 'crypto',
        component: CryptoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
