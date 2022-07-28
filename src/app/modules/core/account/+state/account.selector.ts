import { createSelector } from '@ngrx/store';
import { AccountState } from './account.reducer';

export interface ManageAccountState {
  account: AccountState;
}

export const selectFeature = (state: ManageAccountState) => state.account;

export const getAllAccounts = createSelector(
  selectFeature,
  (state: AccountState) => (state ? state.allAccounts : null)
);

export const getDefaultAccount = createSelector(
  getAllAccounts,
  (accounts: any[]) =>
    accounts ? accounts.find((account) => account?.isDefault === true) : null
);
