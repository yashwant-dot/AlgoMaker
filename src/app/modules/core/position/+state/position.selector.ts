import { createSelector } from '@ngrx/store';
import { PositionState } from './position.reducer';

export interface ManagePositionState {
  position: PositionState;
}

export const selectFeature = (state: ManagePositionState) => state.position;

export const getAllPositions = createSelector(
  selectFeature,
  (state: PositionState) => (state ? state.allPositions : null)
);
