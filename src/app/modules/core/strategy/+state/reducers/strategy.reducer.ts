import { StrategyActions, StrategyActionTypes } from '../actions';

export interface StrategyState {
  data: any[];
  loading: boolean;
  loaded: boolean;
  strategyToUpdate?: any;
}

export const initialStrategyState: StrategyState = {
  data: [],
  loading: false,
  loaded: false,
};

export function reducer(
  state = initialStrategyState,
  action: StrategyActions
): StrategyState {
  switch (action.type) {
    case StrategyActionTypes.GetStrategy:
      return {
        ...state,
        loading: true,
      };
    case StrategyActionTypes.GetStrategySuccess:
      return {
        ...state,
        data: action.payload,
        loading: false,
        loaded: true,
      };
    case StrategyActionTypes.GetStrategyFail:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    case StrategyActionTypes.AddStrategy:
    case StrategyActionTypes.AddStrategySuccess:
    case StrategyActionTypes.AddStrategyFail:
      return state;
    case StrategyActionTypes.DeleteStrategy:
    case StrategyActionTypes.DeleteStrategySuccess:
    case StrategyActionTypes.DeleteStrategyFail:
      return state;
    case StrategyActionTypes.SaveStrategyToUpdate:
      return { ...state, strategyToUpdate: action.payload };
    default:
      return state;
  }
}
