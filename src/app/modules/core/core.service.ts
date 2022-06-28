import { Injectable } from '@angular/core';
import { API } from 'src/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
export class CoreService {
  constructor(private http: HttpClient, private fb: FormBuilder) {}

  getStartergies(): Observable<any> {
    const id = JSON.parse(localStorage.getItem('user') || '{}')?._id;
    return this.http.get(`${API}/strategies/getAllStrategies/${id}`).pipe(
      map((response) => {
        return response;
      }),
      catchError((response) => of(response.error))
    );
  }

  addStratergy(payload: any): Observable<any> {
    return this.http
      .post(`${API}/strategies/addStrategy`, JSON.stringify(payload))
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((response) => of(response.error))
      );
  }

  deleteStratergy(payload: any): Observable<any> {
    return this.http.delete(`${API}/strategies/deleteStrategy/${payload}`).pipe(
      map((response) => {
        return response;
      }),
      catchError((response) => of(response.error))
    );
  }

  toggleStratergy(payload: any): Observable<any> {
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

  updateStratergy(stratergy: any, stratergyId): Observable<any> {
    return this.http
      .post(
        `${API}/strategies/updateStrategy/${stratergyId}`,
        JSON.stringify(stratergy)
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((response) => of(response.error))
      );
  }

  initStratergyForm(stratergyData: any): FormGroup {
    return this.fb.group({
      name: [
        stratergyData && stratergyData.name ? stratergyData.name : '',
        [Validators.required],
      ],
      time: this.fb.group(
        {
          entryTime: [
            stratergyData && stratergyData.entryTime
              ? new Date(stratergyData.entryTime).toLocaleTimeString()
              : '09:20:00',
          ],
          exitTime: [
            stratergyData && stratergyData.exitTime
              ? new Date(stratergyData.exitTime).toLocaleTimeString()
              : '15:10:00',
          ],
        },
        { validator: RangeValidator }
      ),
      direction: [
        stratergyData && stratergyData.direction
          ? stratergyData.direction
          : 'BUY',
      ],
      timeFrame: [
        stratergyData && stratergyData.timeFrame
          ? Number(stratergyData.timeFrame)
          : 5,
      ],
      orderType: [
        stratergyData && stratergyData.orderType
          ? stratergyData.orderType
          : 'MIS',
      ],
      exchange: ['fut_fut'],
      dataSymbol: [
        stratergyData && stratergyData.dataSymbol
          ? stratergyData.dataSymbol
          : 'NIFTY_FUT',
      ],
      orderSymbol: [
        stratergyData && stratergyData.orderSymbol
          ? stratergyData.orderSymbol
          : 'NIFTY_FUT',
      ],
      target: [
        stratergyData && stratergyData.target ? stratergyData.target : 0,
        [Validators.required, Validators.min(0)],
      ],
      targetUnit: [
        stratergyData && stratergyData.targetUnit
          ? stratergyData.targetUnit
          : 'Rs',
      ],
      stopLoss: [
        stratergyData && stratergyData.stopLoss ? stratergyData.stopLoss : 0,
        [Validators.required, Validators.min(0)],
      ],
      stopLossUnit: [
        stratergyData && stratergyData.stopLossUnit
          ? stratergyData.stopLossUnit
          : 'Rs',
      ],
      quantity: [
        stratergyData && stratergyData.quantity ? stratergyData.quantity : 50,
        [Validators.required, Validators.min(0)],
      ],
      trailSLXPoint: [
        stratergyData && stratergyData.trailSLXPoint
          ? stratergyData.trailSLXPoint
          : 0,
        [Validators.required, Validators.min(0)],
      ],
      trailSLYPoint: [
        stratergyData && stratergyData.trailSLYPoint
          ? stratergyData.trailSLYPoint
          : 0,
        [Validators.required, Validators.min(0)],
      ],
      indicators: this.initIndicatorsArray(stratergyData),
    });
  }

  initIndicatorsArray(stratergyData: any): FormArray {
    if (!stratergyData.indicators) {
      return this.fb.array([
        this.fb.group({
          indicator: ['sma'],
          param1: [14],
          param2: [{ value: '', disabled: true }],
          operator: ['greater'],
          value1: [15000],
          value2: [{ value: '', disabled: true }],
        }),
      ]);
    }

    return this.fb.array(
      stratergyData.indicators.map((indicator) => {
        return this.fb.group({
          indicator: [indicator.indicator],
          operator: [indicator.operator],
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
                stratergyData.direction === 'SELL' ||
                indicator.operator === 'signal',
            },
          ],
          value2: [
            {
              value: indicator.value2,
              disabled:
                stratergyData.direction === 'BUY' ||
                indicator.operator === 'signal',
            },
          ],
        });
      })
    );
  }
}
