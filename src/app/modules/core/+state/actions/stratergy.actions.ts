import { Action } from '@ngrx/store';

export enum StratergyActionTypes {
  GetStratergy = '[Stratergy] Get Stratergies',
  GetStratergySuccess = '[Stratergy] Get Stratergy Success',
  GetStratergyFail = '[Stratergy] Get Stratergy Fail',
  AddStratergy = '[Stratergy] Add Stratergy Fail',
  AddStratergySuccess = '[Stratergy] Add Stratergy Success',
  AddStratergyFail = '[Stratergy] Add Stratergy Fail',
  DeleteStratergy = '[Stratergy] Delete Stratergy Fail',
  DeleteStratergySuccess = '[Stratergy] Delete Stratergy Success',
  DeleteStratergyFail = '[Stratergy] Delete Stratergy Fail',
  ToggleStratergy = '[Stratergy] Toggle Stratergy',
  SaveStratergyToUpdate = '[Stratergy] Save Stratergy To Update',
  UpdateStratergy = '[Stratergy] Update Stratergy Fail',
  UpdateStratergySuccess = '[Stratergy] Update Stratergy Success',
  UpdateStratergyFail = '[Stratergy] Update Stratergy Fail',
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
export class DeleteStratergy implements Action {
  readonly type = StratergyActionTypes.DeleteStratergy;
  constructor(public payload: any) {}
}

export class DeleteStratergySuccess implements Action {
  readonly type = StratergyActionTypes.DeleteStratergySuccess;
}

export class DeleteStratergyFail implements Action {
  readonly type = StratergyActionTypes.DeleteStratergyFail;
}

export class ToggleStratergy implements Action {
  readonly type = StratergyActionTypes.ToggleStratergy;
  constructor(public payload: any) {}
}

export class SaveStratergyToUpdate implements Action {
  readonly type = StratergyActionTypes.SaveStratergyToUpdate;
  constructor(public payload: any) {}
}

export class UpdateStratergy implements Action {
  readonly type = StratergyActionTypes.UpdateStratergy;
  constructor(public payload: any, public id: any) {}
}

export class UpdateStratergySuccess implements Action {
  readonly type = StratergyActionTypes.UpdateStratergySuccess;
}

export class UpdateStratergyFail implements Action {
  readonly type = StratergyActionTypes.UpdateStratergyFail;
}

export type StratergyActions =
  | GetStratergy
  | GetStratergySuccess
  | GetStratergyFail
  | AddStratergy
  | AddStratergySuccess
  | AddStratergyFail
  | DeleteStratergy
  | DeleteStratergySuccess
  | DeleteStratergyFail
  | ToggleStratergy
  | SaveStratergyToUpdate
  | UpdateStratergy
  | UpdateStratergySuccess
  | UpdateStratergyFail;
