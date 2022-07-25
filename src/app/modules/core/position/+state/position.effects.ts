import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import {
  PositionActionTypes,
  GetAllPositions,
  GetAllPositionsFail,
  GetAllPositionsSuccess,
} from './position.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { PositionService } from '../position.service';
import { SharedService } from 'src/app/modules/shared/shared.service';
@Injectable()
export class PositionEffects {
  constructor(
    private actions$: Actions,
    private positionServ: PositionService,
    private sharedServ: SharedService
  ) {}

  @Effect() getAllPositions$ = this.actions$.pipe(
    ofType<GetAllPositions>(PositionActionTypes.GetAllPositions),
    switchMap((action) => {
      return from(this.positionServ.getPositions()).pipe(
        map((data) => {
          console.log('asd//...', data);
          return new GetAllPositionsSuccess(data);
        }),
        catchError((err) => {
          return of(new GetAllPositionsFail());
        })
      );
    })
  );
}
