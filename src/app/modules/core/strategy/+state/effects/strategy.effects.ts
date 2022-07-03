import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { StrategyService } from '../../services';
import { Router } from '@angular/router';
import {
  StrategyActionTypes,
  GetStrategy,
  GetStrategySuccess,
  GetStrategyFail,
  AddStrategy,
  AddStrategySuccess,
  AddStrategyFail,
  DeleteStrategy,
  DeleteStrategySuccess,
  ToggleStrategy,
  UpdateStrategy,
} from '../actions';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class StrategyEffects {
  constructor(
    private actions$: Actions,
    private strategyService: StrategyService,
    private router: Router
  ) {}

  @Effect() getStratergies$ = this.actions$.pipe(
    ofType<GetStrategy>(StrategyActionTypes.GetStrategy),
    switchMap((action) => {
      return this.strategyService.getStartegies().pipe(
        map((data) => {
          return new GetStrategySuccess(data);
        }),
        catchError((error) => {
          return of(new GetStrategyFail(error.error));
        })
      );
    })
  );

  @Effect() addStrategy$ = this.actions$.pipe(
    ofType<AddStrategy>(StrategyActionTypes.AddStrategy),
    switchMap((action) => {
      console.log(action.payload);
      return this.strategyService.addStrategy(action.payload).pipe(
        mergeMap((data) => {
          this.router.navigate(['admin/strategy']);
          return [new AddStrategySuccess(), new GetStrategy()];
        }),
        catchError((error) => {
          return of(new AddStrategyFail());
        })
      );
    })
  );

  @Effect() deleteStrategy$ = this.actions$.pipe(
    ofType<DeleteStrategy>(StrategyActionTypes.DeleteStrategy),
    switchMap((action) => {
      return this.strategyService.deleteStrategy(action.payload).pipe(
        mergeMap((data) => {
          return [new DeleteStrategySuccess(), new GetStrategy()];
        }),
        catchError((error) => {
          return of(error);
        })
      );
    })
  );

  @Effect() toggleStrategy$ = this.actions$.pipe(
    ofType<ToggleStrategy>(StrategyActionTypes.ToggleStrategy),
    switchMap((action) => {
      return this.strategyService.toggleStrategy(action.payload).pipe(
        mergeMap((data) => {
          return [new GetStrategy()];
        }),
        catchError((error) => {
          return of(error);
        })
      );
    })
  );

  @Effect() updateStrategy$ = this.actions$.pipe(
    ofType<UpdateStrategy>(StrategyActionTypes.UpdateStrategy),
    switchMap((action) => {
      return this.strategyService
        .updateStrategy(action.payload, action.id)
        .pipe(
          mergeMap((data) => {
            this.router.navigate(['admin/strategy']);
            return [new GetStrategy()];
          }),
          catchError((error) => {
            return of(error);
          })
        );
    })
  );
}
