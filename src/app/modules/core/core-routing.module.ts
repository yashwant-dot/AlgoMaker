import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './containers/accounts/accounts.component';

const routes: Routes = [
  {
    path: 'accounts',
    pathMatch: 'full',
    component: AccountsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
