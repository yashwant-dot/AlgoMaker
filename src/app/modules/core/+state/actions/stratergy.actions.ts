import { Action } from '@ngrx/store';

export enum StratergyActionTypes {
  GetStratergy = '[Stratergy] Get Stratergies',
  GetStratergySuccess = '[Stratergy] Get Stratergy Success',
  GetStratergyFail = '[Stratergy] Get Stratergy Fail',
  AddStratergy = '[Stratergy] Add Stratergy Fail',
  AddStratergySuccess = '[Stratergy] Add Stratergy Success',
  AddStratergyFail = '[Stratergy] Add Stratergy Fail',
}

export class GetStratergy implements Action {
  readonly type = StratergyActionTypes.GetStratergy;
}

export class GetStratergySuccess implements Action {
  readonly type = StratergyActionTypes.GetStratergySuccess;
  constructor(public payload: any) {}
}

export class GetStratergyFail implements Action {
  readonly type = StratergyActionTypes.GetStratergyFail;
  constructor(public payload: any) {}
}

export class AddStratergy implements Action {
  readonly type = StratergyActionTypes.AddStratergy;
  constructor(public payload: any) {}
}

export class AddStratergySuccess implements Action {
  readonly type = StratergyActionTypes.AddStratergySuccess;
}

export class AddStratergyFail implements Action {
  readonly type = StratergyActionTypes.AddStratergyFail;
}

export type StratergyActions =
  | GetStratergy
  | GetStratergySuccess
  | GetStratergyFail
  | AddStratergy
  | AddStratergySuccess
  | AddStratergyFail;
