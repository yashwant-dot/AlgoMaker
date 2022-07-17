import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import {
  AccountActionTypes,
  AddAccount,
  AddAccountSuccess,
  AddAccountFail,
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
            alert(data.message.message);
          }
          this.sharedServ.openSnackBar('success', 'Account added successfully');
          return new AddAccountSuccess(data);
        }),
        catchError((err) => {
          return of(new AddAccountFail());
        })
      );
    })
  );
}
