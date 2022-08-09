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
  MakeAccountDefault,
  MakeAccountDefaultSuccess,
  MakeAccountDefaultFail,
  DeleteAccount,
  DeleteAccountFail,
  DeleteAccountSuccess,
  UpdateAccount,
  UpdateAccountSuccess,
  UpdateAccountFail,
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
        mergeMap((data) => {
          if (data && data.message && data.message.errors) {
            this.sharedServ.openSnackBar('error', data.message.message);
            return of(new AddAccountFail());
          }
          return [new AddAccountSuccess(), new GetAllAccounts()];
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

  @Effect({ dispatch: false }) addAccountFailure$ = this.actions$.pipe(
    ofType<AddAccountFail>(AccountActionTypes.AddAccountFail),
    tap((action) => {
      this.sharedServ.openSnackBar(
        'error',
        'Something went wrong! Please try again.'
      );
    })
  );

  @Effect() getAllAccounts$ = this.actions$.pipe(
    ofType<GetAllAccounts>(AccountActionTypes.GetAllAccounts),
    switchMap((action) => {
      return this.accountServ.getAllAccounts().pipe(
        map((data) => {
          if (data && data.message && data.message.errors) {
            this.sharedServ.openSnackBar('error', data.message.message);
            return new GetAllAccountsFail();
          }
          return new GetAllAccountsSuccess(data);
        }),
        catchError((err) => {
          return of(new GetAllAccountsFail());
        })
      );
    })
  );

  @Effect() makeAccountDefault$ = this.actions$.pipe(
    ofType<MakeAccountDefault>(AccountActionTypes.MakeAccountDefault),
    switchMap((action) => {
      return this.accountServ.makeAccountDefault(action.payload).pipe(
        mergeMap((data) => {
          return [new MakeAccountDefaultSuccess(), new GetAllAccounts()];
        }),
        catchError((error) => of(new MakeAccountDefaultFail()))
      );
    })
  );

  @Effect({ dispatch: false }) makeAccountDefaultSuccess$ = this.actions$.pipe(
    ofType<MakeAccountDefaultSuccess>(
      AccountActionTypes.MakeAccountDefaultSuccess
    ),
    tap((action) => {
      this.sharedServ.openSnackBar('success', 'Account set as Default!');
    })
  );

  @Effect() deleteAccount$ = this.actions$.pipe(
    ofType<DeleteAccount>(AccountActionTypes.DeleteAccount),
    switchMap((action) => {
      return this.accountServ.deleteAccount(action.payload).pipe(
        mergeMap((data) => {
          if (data.error) {
            this.sharedServ.openSnackBar('error', data.message);
            return of(new DeleteAccountFail());
          }
          return [new DeleteAccountSuccess(), new GetAllAccounts()];
        })
      );
    })
  );

  @Effect({ dispatch: false }) onDeleteAccountSuccess$ = this.actions$.pipe(
    ofType<DeleteAccountSuccess>(AccountActionTypes.DeleteAccountSuccess),
    tap((action) => {
      this.sharedServ.openSnackBar('success', 'Account deleted successfully');
    })
  );

  @Effect({ dispatch: false }) onDeleteAccountFailure$ = this.actions$.pipe(
    ofType<DeleteAccountFail>(AccountActionTypes.DeleteAccountFail),
    tap((action) => {
      this.sharedServ.openSnackBar(
        'error',
        'Something went wrong! Please try again.'
      );
    })
  );

  @Effect() updateAccount$ = this.actions$.pipe(
    ofType<UpdateAccount>(AccountActionTypes.UpdateAccount),
    switchMap((action) => {
      return this.accountServ.updateAccount(action.payload).pipe(
        mergeMap((data) => {
          if (data.error) {
            this.sharedServ.openSnackBar('error', data.message);
            return of(new UpdateAccountFail());
          }
          return [new UpdateAccountSuccess(), new GetAllAccounts()];
        })
      );
    })
  );

  @Effect({ dispatch: false }) onUpdateAccountSuccess$ = this.actions$.pipe(
    ofType<UpdateAccountSuccess>(AccountActionTypes.UpdateAccountSuccess),
    tap((action) => {
      this.sharedServ.openSnackBar('success', 'Account updated successfully');
    })
  );

  @Effect({ dispatch: false }) onUpdateAccountFailure$ = this.actions$.pipe(
    ofType<UpdateAccountFail>(AccountActionTypes.UpdateAccountFail),
    tap((action) => {
      this.sharedServ.openSnackBar(
        'error',
        'Something went wrong! Please try again.'
      );
    })
  );
}
