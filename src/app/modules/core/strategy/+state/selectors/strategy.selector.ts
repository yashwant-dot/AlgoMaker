import { createSelector } from '@ngrx/store';
import { ManageStrategyState, StrategyState, getState } from '../reducers';

export const getStarteyState = createSelector(
  getState,
  (state: ManageStrategyState) => {
    return state ? state.strategy : null;
  }
);

export const getStrategies = createSelector(
  getStarteyState,
  (state: StrategyState): any => {
    return state ? state.data : null;
  }
);

export const getStrategyToUpdate = createSelector(
  getStarteyState,
  (state: StrategyState): any => {
    return state && state.strategyToUpdate ? state.strategyToUpdate : null;
  }
);
