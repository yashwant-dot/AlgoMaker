import { StratergyActions, StratergyActionTypes } from '../actions';

export interface StratergyState {
  data: any[];
  loading: boolean;
  loaded: boolean;
  stratergyToUpdate?: any;
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
    case StratergyActionTypes.AddStratergy:
    case StratergyActionTypes.AddStratergySuccess:
    case StratergyActionTypes.AddStratergyFail:
      return state;
    case StratergyActionTypes.DeleteStratergy:
    case StratergyActionTypes.DeleteStratergySuccess:
    case StratergyActionTypes.DeleteStratergyFail:
      return state;
    case StratergyActionTypes.SaveStratergyToUpdate:
      return { ...state, stratergyToUpdate: action.payload };
    default:
      return state;
  }
}
