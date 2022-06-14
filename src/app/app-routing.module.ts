import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, SignupComponent } from './modules/auth/components';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { CoreModule } from './modules/core/core.module';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/core/core.module').then((m) => m.CoreModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
