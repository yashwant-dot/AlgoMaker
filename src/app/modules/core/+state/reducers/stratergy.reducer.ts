import { StratergyActions, StratergyActionTypes } from '../actions';

export interface StratergyState {
  data: any[];
  loading: boolean;
  loaded: boolean;
}

export const initialStratergyState: StratergyState = {
  data: [],
  loading: false,
  loaded: false,
};

export function reducer(
  state = initialStratergyState,
  action: StratergyActions
): StratergyState {
  switch (action.type) {
    case StratergyActionTypes.GetStratergy:
      return {
        ...state,
        loading: true,
      };
    case StratergyActionTypes.GetStratergySuccess:
      return {
        ...state,
        data: action.payload,
        loading: false,
        loaded: true,
      };
    case StratergyActionTypes.GetStratergyFail:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    default:
      return state;
  }
}
