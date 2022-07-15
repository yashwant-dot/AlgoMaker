import { Injectable } from '@angular/core';
import { API } from 'src/config';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

const RangeValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const start = control.get('entryTime').value;
  const end = control.get('exitTime').value;
  return start !== null && end !== null && start < end ? null : { range: true };
};

@Injectable({
  providedIn: 'root',
})
export class StrategyService {
  constructor(private http: HttpClient, private fb: FormBuilder) {}

  getStartegies(): Observable<any> {
    const id = JSON.parse(localStorage.getItem('user') || '{}')?._id;
    return this.http.get(`${API}/strategies/getAllStrategies/${id}`).pipe(
      map((response) => {
        return response;
      }),
      catchError((response) => of(response.error))
    );
  }

  addStrategy(payload: any): Observable<any> {
    return this.http
      .post(`${API}/strategies/addStrategy`, JSON.stringify(payload))
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((response) => of(response.error))
      );
  }

  deleteStrategy(payload: any): Observable<any> {
    return this.http.delete(`${API}/strategies/deleteStrategy/${payload}`).pipe(
      map((response) => {
        return response;
      }),
      catchError((response) => of(response.error))
    );
  }

  toggleStrategy(payload: any): Observable<any> {
    return this.http
      .post(`${API}/strategies/toggleStrategy/${payload}`, {
        headers: { 'Content-Length': 0 },
      })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((response) => of(response.error))
      );
  }

  updateStrategy(strategy: any, strategyId): Observable<any> {
    return this.http
      .post(
        `${API}/strategies/updateStrategy/${strategyId}`,
        JSON.stringify(strategy)
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((response) => of(response.error))
      );
  }

  initStrategyForm(strategyData: any): FormGroup {
    return this.fb.group({
      name: [
        strategyData && strategyData.name ? strategyData.name : '',
        [Validators.required],
      ],
      time: this.fb.group(
        {
          entryTime: [
            strategyData && strategyData.entryTime
              ? new Date(strategyData.entryTime).toLocaleTimeString()
              : '09:20:00',
          ],
          exitTime: [
            strategyData && strategyData.exitTime
              ? new Date(strategyData.exitTime).toLocaleTimeString()
              : '15:10:00',
          ],
        },
        { validator: RangeValidator }
      ),
      direction: [
        strategyData && strategyData.direction ? strategyData.direction : 'BUY',
      ],
      timeFrame: [
        strategyData && strategyData.timeFrame
          ? Number(strategyData.timeFrame)
          : 5,
      ],
      orderType: [
        strategyData && strategyData.orderType ? strategyData.orderType : 'MIS',
      ],
      exchange: [
        strategyData && strategyData.exchange
          ? strategyData.exchange
          : 'fut_fut',
      ],
      dataSymbol: [
        strategyData && strategyData.dataSymbol
          ? strategyData.dataSymbol
          : 'NIFTY_FUT',
      ],
      orderSymbol: [
        strategyData && strategyData.orderSymbol
          ? strategyData.orderSymbol
          : 'NIFTY_FUT',
      ],
      target: [
        strategyData && strategyData.target ? strategyData.target : 0,
        [Validators.required, Validators.min(0)],
      ],
      targetUnit: [
        strategyData && strategyData.targetUnit
          ? strategyData.targetUnit
          : 'Rs',
      ],
      stopLoss: [
        strategyData && strategyData.stopLoss ? strategyData.stopLoss : 0,
        [Validators.required, Validators.min(0)],
      ],
      stopLossUnit: [
        strategyData && strategyData.stopLossUnit
          ? strategyData.stopLossUnit
          : 'Rs',
      ],
      quantity: [
        strategyData && strategyData.quantity ? strategyData.quantity : 50,
        [Validators.required, Validators.min(0)],
      ],
      trailSLXPoint: [
        strategyData && strategyData.trailSLXPoint
          ? strategyData.trailSLXPoint
          : 0,
        [Validators.required, Validators.min(0)],
      ],
      trailSLYPoint: [
        strategyData && strategyData.trailSLYPoint
          ? strategyData.trailSLYPoint
          : 0,
        [Validators.required, Validators.min(0)],
      ],
      indicators: this.initIndicatorsArray(strategyData),
    });
  }

  initIndicatorsArray(strategyData: any): FormArray {
    if (!strategyData.indicators) {
      return this.fb.array([
        this.fb.group({
          indicator: ['sma'],
          param1: [14],
          param2: [{ value: '', disabled: true }],
          operator1: ['greater'],
          operator2: [''],
          value1: [15000],
          value2: [{ value: '', disabled: true }],
        }),
      ]);
    }

    return this.fb.array(
      strategyData.indicators.map((indicator) => {
        return this.fb.group({
          indicator: [indicator.indicator],
          operator1: [indicator.operator1],
          operator2: [{ value: indicator.operator2, disabled: true }],
          param1: [indicator.param1],
          param2: [
            {
              value: indicator.param2,
              disabled: indicator.indicator !== 'supertrend',
            },
          ],
          value1: [
            {
              value: indicator.value1,
              disabled:
                strategyData.direction === 'SELL' ||
                indicator.operator1 === 'signal',
            },
          ],
          value2: [
            {
              value: indicator.value2,
              disabled:
                strategyData.direction === 'BUY' ||
                indicator.operator1 === 'signal',
            },
          ],
        });
      })
    );
  }
}
