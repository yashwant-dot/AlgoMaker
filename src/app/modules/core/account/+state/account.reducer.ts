import { AccountActions, AccountActionTypes } from './account.actions';

export interface AccountState {
  data: any[];
  loading: boolean;
  loaded: boolean;
}

export const initialAccountState: AccountState = {
  data: [],
  loading: false,
  loaded: false,
};

export function AccountReducer(
  state = initialAccountState,
  action: AccountActions
): AccountState {
  switch (action.type) {
    case AccountActionTypes.AddAccount:
      return state;
    case AccountActionTypes.AddAccountSuccess:
      return state;
    case AccountActionTypes.AddAccountFail:
      return state;
    default:
      return state;
  }
}
