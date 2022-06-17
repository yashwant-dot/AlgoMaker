import { Action } from '@ngrx/store';

export enum StratergyActionTypes {
  GetStratergy = '[Stratergy] Get Stratergys',
  GetStratergySuccess = '[Stratergy] Get Stratergy Success',
  GetStratergyFail = '[Stratergy] Get Stratergy Fail',
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

export type StratergyActions =
  | GetStratergy
  | GetStratergySuccess
  | GetStratergyFail;
