import { Action } from '@ngrx/store';

export enum AccountActionTypes {
  GetAllAccounts = '[Account] Get All Accounts',
  GetAllAccountsSuccess = '[Account] Get All Accounts Success',
  GetAllAccountsFail = '[Account] Get All Accounts Fail',
  AddAccount = '[Account] Add Account',
  AddAccountSuccess = '[Account] Add Account Success',
  AddAccountFail = '[Account] Add Account Fail',
}

export class GetAllAccounts implements Action {
  readonly type = AccountActionTypes.GetAllAccounts;
  constructor() {}
}

export class GetAllAccountsSuccess implements Action {
  readonly type = AccountActionTypes.GetAllAccountsSuccess;
  constructor(public payload: any) {}
}

export class GetAllAccountsFail implements Action {
  readonly type = AccountActionTypes.GetAllAccountsFail;
  constructor() {}
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

export type AccountActions =
  | AddAccount
  | AddAccountSuccess
  | AddAccountFail
  | GetAllAccounts
  | GetAllAccountsSuccess
  | GetAllAccountsFail;
