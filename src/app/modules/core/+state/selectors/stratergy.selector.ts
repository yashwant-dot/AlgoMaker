import { createSelector } from '@ngrx/store';
import { ManageCoreState, StratergyState, getCoreState } from '../reducers';

export const getStartergyState = createSelector(
  getCoreState,
  (state: ManageCoreState) => {
    return state ? state.stratergy : null;
  }
);

export const getStratergies = createSelector(
  getStartergyState,
  (state: StratergyState): any => {
    return state ? state.data : null;
  }
);

export const getStratergyToUpdate = createSelector(
  getStartergyState,
  (state: StratergyState): any => {
    return state && state.stratergyToUpdate ? state.stratergyToUpdate : null;
  }
);
