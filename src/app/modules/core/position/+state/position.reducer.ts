import { PositionActions, PositionActionTypes } from './position.actions';

export interface PositionState {
  allPositions: any[];
  loading: boolean;
  loaded: boolean;
}

export const initialPositionState: PositionState = {
  allPositions: [],
  loading: false,
  loaded: false,
};

export function PositionReducer(
  state = initialPositionState,
  action: PositionActions
): PositionState {
  switch (action.type) {
    case PositionActionTypes.GetAllPositions:
      return state;
    case PositionActionTypes.GetAllPositionsSuccess:
      return {
        ...state,
        allPositions: action.payload,
      };
    case PositionActionTypes.GetAllPositionsFail:
      return state;
  }
}
