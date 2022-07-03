import { Action } from '@ngrx/store';

export enum StrategyActionTypes {
  GetStrategy = '[Strategy] Get Stratergies',
  GetStrategySuccess = '[Strategy] Get Strategy Success',
  GetStrategyFail = '[Strategy] Get Strategy Fail',
  AddStrategy = '[Strategy] Add Strategy Fail',
  AddStrategySuccess = '[Strategy] Add Strategy Success',
  AddStrategyFail = '[Strategy] Add Strategy Fail',
  DeleteStrategy = '[Strategy] Delete Strategy Fail',
  DeleteStrategySuccess = '[Strategy] Delete Strategy Success',
  DeleteStrategyFail = '[Strategy] Delete Strategy Fail',
  ToggleStrategy = '[Strategy] Toggle Strategy',
  SaveStrategyToUpdate = '[Strategy] Save Strategy To Update',
  UpdateStrategy = '[Strategy] Update Strategy Fail',
  UpdateStrategySuccess = '[Strategy] Update Strategy Success',
  UpdateStrategyFail = '[Strategy] Update Strategy Fail',
}

export class GetStrategy implements Action {
  readonly type = StrategyActionTypes.GetStrategy;
}

export class GetStrategySuccess implements Action {
  readonly type = StrategyActionTypes.GetStrategySuccess;
  constructor(public payload: any) {}
}

export class GetStrategyFail implements Action {
  readonly type = StrategyActionTypes.GetStrategyFail;
  constructor(public payload: any) {}
}

export class AddStrategy implements Action {
  readonly type = StrategyActionTypes.AddStrategy;
  constructor(public payload: any) {}
}

export class AddStrategySuccess implements Action {
  readonly type = StrategyActionTypes.AddStrategySuccess;
}

export class AddStrategyFail implements Action {
  readonly type = StrategyActionTypes.AddStrategyFail;
}
export class DeleteStrategy implements Action {
  readonly type = StrategyActionTypes.DeleteStrategy;
  constructor(public payload: any) {}
}

export class DeleteStrategySuccess implements Action {
  readonly type = StrategyActionTypes.DeleteStrategySuccess;
}

export class DeleteStrategyFail implements Action {
  readonly type = StrategyActionTypes.DeleteStrategyFail;
}

export class ToggleStrategy implements Action {
  readonly type = StrategyActionTypes.ToggleStrategy;
  constructor(public payload: any) {}
}

export class SaveStrategyToUpdate implements Action {
  readonly type = StrategyActionTypes.SaveStrategyToUpdate;
  constructor(public payload: any) {}
}

export class UpdateStrategy implements Action {
  readonly type = StrategyActionTypes.UpdateStrategy;
  constructor(public payload: any, public id: any) {}
}

export class UpdateStrategySuccess implements Action {
  readonly type = StrategyActionTypes.UpdateStrategySuccess;
}

export class UpdateStrategyFail implements Action {
  readonly type = StrategyActionTypes.UpdateStrategyFail;
}

export type StrategyActions =
  | GetStrategy
  | GetStrategySuccess
  | GetStrategyFail
  | AddStrategy
  | AddStrategySuccess
  | AddStrategyFail
  | DeleteStrategy
  | DeleteStrategySuccess
  | DeleteStrategyFail
  | ToggleStrategy
  | SaveStrategyToUpdate
  | UpdateStrategy
  | UpdateStrategySuccess
  | UpdateStrategyFail;
