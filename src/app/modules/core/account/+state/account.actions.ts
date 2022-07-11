import { Action } from '@ngrx/store';

export enum AccountActionTypes {
  AddAccount = '[Account] Add Account',
  AddAccountSuccess = '[Account] Add Account Success',
  AddAccountFail = '[Account] Add Account Fail',
}

export class AddAccount implements Action {
  readonly type = AccountActionTypes.AddAccount;
  constructor(public payload: any) {}
}

export class AddAccountSuccess implements Action {
  readonly type = AccountActionTypes.AddAccountSuccess;
  constructor(public payload: any) {}
}

export class AddAccountFail implements Action {
  readonly type = AccountActionTypes.AddAccountFail;
  constructor() {}
}

export type AccountActions = AddAccount | AddAccountSuccess | AddAccountFail;
