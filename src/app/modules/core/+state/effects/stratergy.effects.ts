import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { ManageCoreState } from '../reducers';
import { CoreService } from '../../core.service';
import {
  StratergyActionTypes,
  GetStratergy,
  GetStratergySuccess,
  GetStratergyFail,
} from '../actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class StratergyEffects {
  constructor(
    private store: Store<ManageCoreState>,
    private actions$: Actions,
    private coreService: CoreService
  ) {}

  @Effect() getStratergies$ = this.actions$.pipe(
    ofType<GetStratergy>(StratergyActionTypes.GetStratergy),
    switchMap((action) => {
      return this.coreService.getStartergies().pipe(
        map((data) => {
          return new GetStratergySuccess(data);
        }),
        catchError((error) => {
          return of(new GetStratergyFail(error.error));
        })
      );
    })
  );
}
