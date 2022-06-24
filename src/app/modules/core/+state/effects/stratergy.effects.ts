import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { CoreService } from '../../core.service';
import { Router } from '@angular/router';
import {
  StratergyActionTypes,
  GetStratergy,
  GetStratergySuccess,
  GetStratergyFail,
  AddStratergy,
  AddStratergySuccess,
  AddStratergyFail,
} from '../actions';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class StratergyEffects {
  constructor(
    private actions$: Actions,
    private coreService: CoreService,
    private router: Router
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

  @Effect() addStratergy$ = this.actions$.pipe(
    ofType<AddStratergy>(StratergyActionTypes.AddStratergy),
    switchMap((action) => {
      return this.coreService.addStratergy(action.payload).pipe(
        mergeMap((data) => {
          this.router.navigate(['admin/stratergy']);
          return [new AddStratergySuccess(), new GetStratergy()];
        }),
        catchError((error) => {
          return of(new AddStratergyFail());
        })
      );
    })
  );
}
