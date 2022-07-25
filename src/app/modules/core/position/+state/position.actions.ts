import { Action } from '@ngrx/store';

export enum PositionActionTypes {
  GetAllPositions = '[Position] Get All Positions',
  GetAllPositionsSuccess = '[Position] Get All Positions Success',
  GetAllPositionsFail = '[Position] Get All Positions Fail',
}

export class GetAllPositions implements Action {
  readonly type = PositionActionTypes.GetAllPositions;
  constructor() {}
}

export class GetAllPositionsSuccess implements Action {
  readonly type = PositionActionTypes.GetAllPositionsSuccess;
  constructor(public payload: any) {}
}

export class GetAllPositionsFail implements Action {
  readonly type = PositionActionTypes.GetAllPositionsFail;
  constructor() {}
}

export type PositionActions =
  | GetAllPositions
  | GetAllPositionsSuccess
  | GetAllPositionsFail;
