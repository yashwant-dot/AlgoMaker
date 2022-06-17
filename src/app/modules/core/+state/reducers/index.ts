import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromStratergy from './stratergy.reducer';

export * from './stratergy.reducer';

export const MANAGE_CORE_FEATURE_KEY = 'coreFeature';

export interface ManageCoreState {
  stratergy: fromStratergy.StratergyState;
}

export const reducers: ActionReducerMap<ManageCoreState> = {
  stratergy: fromStratergy.reducer,
};

export const getCoreState = createFeatureSelector<ManageCoreState>(
  MANAGE_CORE_FEATURE_KEY
);
