import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import {
  AccountActionTypes,
  AddAccount,
  AddAccountSuccess,
  AddAccountFail,
} from './account.actions';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AccountService } from '../services';

@Injectable()
export class AccountEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private accountServ: AccountService
  ) {}

  @Effect() addAccount$ = this.actions$.pipe(
    ofType<AddAccount>(AccountActionTypes.AddAccount),
    switchMap((action) => {
      return this.accountServ.addAccount(action.payload).pipe(
        map((data) => {
          return new AddAccountSuccess(data);
        }),
        catchError((err) => of(new AddAccountFail()))
      );
    })
  );
}
