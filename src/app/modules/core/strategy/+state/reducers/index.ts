import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromStrategy from './strategy.reducer';

export * from './strategy.reducer';

export const MANAGE_STRATEGY_FEATURE_KEY = 'strategyFeature';

export interface ManageStrategyState {
  strategy: fromStrategy.StrategyState;
}

export const reducers: ActionReducerMap<ManageStrategyState> = {
  strategy: fromStrategy.reducer,
};

export const getState = createFeatureSelector<ManageStrategyState>(
  MANAGE_STRATEGY_FEATURE_KEY
);
