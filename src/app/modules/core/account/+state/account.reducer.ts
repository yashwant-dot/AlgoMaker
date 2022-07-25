import { AccountActions, AccountActionTypes } from './account.actions';

export interface AccountState {
  allAccounts: any[];
  loading: boolean;
  loaded: boolean;
}

export const initialAccountState: AccountState = {
  allAccounts: [],
  loading: false,
  loaded: false,
};

export function AccountReducer(
  state = initialAccountState,
  action: AccountActions
): AccountState {
  switch (action.type) {
    case AccountActionTypes.GetAllAccounts:
      return state;
    case AccountActionTypes.GetAllAccountsSuccess:
      return {
        ...state,
        allAccounts: action.payload,
      };
    case AccountActionTypes.GetAllAccountsFail:
      return state;
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
