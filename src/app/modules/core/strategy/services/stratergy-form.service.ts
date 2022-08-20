import { Injectable } from '@angular/core';
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
export class StratergyFormService {
  constructor(private fb: FormBuilder) {}

  getNewIndicatorFormGroup(strategyFormGroup: FormGroup) {
    return this.fb.group({
      indicator: [''],
      param1: ['', [Validators.required]],
      param2: [''],
      operator1: [''],
      operator2: [''],
      value1: [
        { value: '', disabled: this.checkDisable(strategyFormGroup, 'SELL') },
      ],
      value2: [
        { value: '', disabled: this.checkDisable(strategyFormGroup, 'BUY') },
      ],
    });
  }

  formatTime(time: any): string {
    const timeArr = time.split(':');
    const today = new Date();
    return new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      timeArr[0],
      timeArr[1]
    ).toISOString();
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
      maxOrders: [
        strategyData && strategyData.maxOrders ? strategyData.maxOrders : 1,
      ],
      ce_pe: [strategyData && strategyData.ce_pe ? strategyData.ce_pe : 'ce'],
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
          param1: [14, [Validators.required]],
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
          operator1: [
            strategyData?.direction === 'SELL'
              ? indicator.operator2
              : indicator.operator1,
          ],
          operator2: [{ value: indicator.operator2, disabled: true }],
          param1: [indicator.param1, [Validators.required]],
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

  onIndicatorsValueChanges(
    indicators: FormArray,
    strategyFormGroup: FormGroup
  ) {
    indicators.controls.forEach((control, index) => {
      control.get('operator1').valueChanges.subscribe((val) => {
        if (val === 'signal') {
          control.get('value1').reset();
          control.get('value1').disable();
          control.get('value2').reset();
          control.get('value2').disable();
          if (strategyFormGroup.get('direction').value === 'BOTH') {
            console.log('asads');
            control
              .get('operator2')
              .setValue(this.getOperator2(control, 'operator1'));
          }
        } else {
          if (strategyFormGroup.get('direction').value === 'BUY') {
            control.get('value1').enable();
            control.get('value2').disable();
          } else if (strategyFormGroup.get('direction').value === 'SELL') {
            control.get('value1').disable();
            control.get('value2').enable();
          } else {
            control.get('value1').enable();
            control.get('value2').enable();
          }

          control
            .get('operator2')
            .setValue(this.getOperator2(control, 'operator1'));
          control.get('operator2').disable();
        }
      });

      control.get('indicator').valueChanges.subscribe((val) => {
        if (val !== 'supertrend') {
          control.get('param2').disable();
          control.get('param2').clearValidators();
        } else {
          control.get('param2').enable();
          control.get('param2').setValidators(Validators.required);
          control.get('param2').updateValueAndValidity();
        }
      });
    });
  }

  toggleIndicatorValueField(indicators: FormArray, value: string) {
    indicators.controls.forEach((control) => {
      if (value === 'BUY') {
        control.get('value1').enable();
        this.resetControl(control, 'value2');
        this.resetControl(control, 'operator2');
        control.get('value2').disable();
      } else if (value === 'SELL') {
        this.resetControl(control, 'value1');
        this.resetControl(control, 'operator2');
        control.get('value1').disable();
        control.get('value2').enable();
      } else {
        control.get('value1').enable();
        this.resetControl(control, 'value1');
        control.get('value2').enable();
        this.resetControl(control, 'value2');
        control
          .get('operator2')
          .setValue(this.getOperator2(control, 'operator1'));
        control.get('operator2').disable();
      }
    });
  }

  resetControl(control: AbstractControl, field: string) {
    control.get(field).reset();
  }

  getOperator2(control: AbstractControl, field: string): string {
    console.log(control.get(field).value);
    switch (control.get(field).value) {
      case 'signal':
        return 'signal';
      case 'greater':
        return 'less';
      case 'less':
        return 'greater';
      case 'crossabove':
        return 'crossbelow';
      case 'crossbelow':
        return 'crossabove';
      default:
        return null;
    }
  }

  checkDisable(strategyFormGroup: FormGroup, value: string): boolean {
    if (strategyFormGroup.get('direction').value === value) return true;
    return false;
  }

  checkKeyForNumber(key): boolean {
    if (
      key === 'quantity' ||
      key === 'target' ||
      key === 'stopLoss' ||
      key === 'trailSLXPoint' ||
      key === 'trailSLYPoint'
    ) {
      return true;
    }
    return false;
  }
}
