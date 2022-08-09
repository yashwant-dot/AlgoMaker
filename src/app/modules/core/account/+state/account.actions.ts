import { Action } from '@ngrx/store';

export enum AccountActionTypes {
  GetAllAccounts = '[Account] Get All Accounts',
  GetAllAccountsSuccess = '[Account] Get All Accounts Success',
  GetAllAccountsFail = '[Account] Get All Accounts Fail',
  AddAccount = '[Account] Add Account',
  AddAccountSuccess = '[Account] Add Account Success',
  AddAccountFail = '[Account] Add Account Fail',
  UpdateAccount = '[Account] Update Account',
  UpdateAccountSuccess = '[Account] Update Account Success',
  UpdateAccountFail = '[Account] Update Account Fail',
  DeleteAccount = '[Account] Delete Account',
  DeleteAccountSuccess = '[Account] Delete Account Success',
  DeleteAccountFail = '[Account] Delete Account Fail',
  MakeAccountDefault = '[Account] Make Account Default',
  MakeAccountDefaultSuccess = '[Account] Make Account Default Success',
  MakeAccountDefaultFail = '[Account] Make Account Default Fail',
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
}

export class AddAccountFail implements Action {
  readonly type = AccountActionTypes.AddAccountFail;
}
export class UpdateAccount implements Action {
  readonly type = AccountActionTypes.UpdateAccount;
  constructor(public payload: any) {}
}

export class UpdateAccountSuccess implements Action {
  readonly type = AccountActionTypes.UpdateAccountSuccess;
}

export class UpdateAccountFail implements Action {
  readonly type = AccountActionTypes.UpdateAccountFail;
}
export class DeleteAccount implements Action {
  readonly type = AccountActionTypes.DeleteAccount;
  constructor(public payload: any) {}
}

export class DeleteAccountSuccess implements Action {
  readonly type = AccountActionTypes.DeleteAccountSuccess;
}

export class DeleteAccountFail implements Action {
  readonly type = AccountActionTypes.DeleteAccountFail;
}

export class MakeAccountDefault implements Action {
  readonly type = AccountActionTypes.MakeAccountDefault;
  constructor(public payload: any) {}
}

export class MakeAccountDefaultSuccess implements Action {
  readonly type = AccountActionTypes.MakeAccountDefaultSuccess;
}

export class MakeAccountDefaultFail implements Action {
  readonly type = AccountActionTypes.MakeAccountDefaultFail;
}

export type AccountActions =
  | AddAccount
  | AddAccountSuccess
  | AddAccountFail
  | GetAllAccounts
  | GetAllAccountsSuccess
  | GetAllAccountsFail
  | MakeAccountDefault
  | MakeAccountDefaultSuccess
  | MakeAccountDefaultFail
  | DeleteAccount
  | DeleteAccountSuccess
  | DeleteAccountFail
  | UpdateAccount
  | UpdateAccountSuccess
  | UpdateAccountFail;
