import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import {
  AccountActionTypes,
  AddAccount,
  AddAccountSuccess,
  AddAccountFail,
  GetAllAccountsSuccess,
  GetAllAccountsFail,
  GetAllAccounts,
} from './account.actions';
import { switchMap, map, catchError, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AccountService } from '../services';
import { SharedService } from 'src/app/modules/shared/shared.service';
@Injectable()
export class AccountEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private accountServ: AccountService,
    private sharedServ: SharedService
  ) {}

  @Effect() addAccount$ = this.actions$.pipe(
    ofType<AddAccount>(AccountActionTypes.AddAccount),
    switchMap((action) => {
      return this.accountServ.addAccount(action.payload).pipe(
        map((data) => {
          if (data && data.message && data.message.errors) {
            this.sharedServ.openSnackBar('error', data.message.message);
          }
          return new AddAccountSuccess(data);
        }),
        catchError((err) => {
          return of(new AddAccountFail());
        })
      );
    })
  );

  @Effect({ dispatch: false }) addAccountSuccess$ = this.actions$.pipe(
    ofType<AddAccountSuccess>(AccountActionTypes.AddAccountSuccess),
    tap((action) => {
      this.sharedServ.openSnackBar('success', 'Account added successfully');
    })
  );

  @Effect() getAllAccounts$ = this.actions$.pipe(
    ofType<GetAllAccounts>(AccountActionTypes.GetAllAccounts),
    switchMap((action) => {
      return this.accountServ.getAllAccounts().pipe(
        map((data) => {
          console.log('accounts...', data);
          if (data && data.message && data.message.errors) {
            this.sharedServ.openSnackBar('error', data.message.message);
          }
          return new GetAllAccountsSuccess(data);
        }),
        catchError((err) => {
          return of(new GetAllAccountsFail());
        })
      );
    })
  );
}
