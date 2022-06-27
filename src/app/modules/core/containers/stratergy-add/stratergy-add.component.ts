import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  FormArray,
  AbstractControl,
  ValidationErrors,
  FormControl,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AddStratergy } from '../../+state';

const RangeValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const start = control.get('startTime').value;
  const end = control.get('endTime').value;
  return start !== null && end !== null && start < end ? null : { range: true };
};

@Component({
  selector: 'app-stratergy-add',
  templateUrl: './stratergy-add.component.html',
  styleUrls: ['./stratergy-add.component.scss'],
})
export class StratergyAddComponent implements OnInit {
  stratergyFormGroup!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {}

  get indicator(): FormGroup {
    return this.fb.group({
      indicator: [''],
      param1: [''],
      param2: [],
      operator: [''],
      value1: [{ value: '', disabled: this.checkDisable('SELL') }],
      value2: [{ value: '', disabled: this.checkDisable('BUY') }],
    });
  }

  get getIndicator(): FormArray {
    return <FormArray>this.stratergyFormGroup.get('indicators');
  }

  ngOnInit(): void {
    this.initStratergyForm();
  }

  initStratergyForm(): void {
    this.stratergyFormGroup = this.fb.group({
      name: ['', [Validators.required]],
      time: this.fb.group(
        {
          startTime: ['09:20:00'],
          endTime: ['15:10:00'],
        },
        { validators: RangeValidator }
      ),
      direction: ['BUY'],
      timeFrame: [5],
      orderType: ['MIS'],
      exchange: ['fut_fut'],
      dataSymbol: ['NIFTY_FUT'],
      orderSymbol: ['NIFTY_FUT'],
      target: [0, [Validators.required, Validators.min(0)]],
      targetUnit: ['Rs'],
      stopLoss: [0, [Validators.required, Validators.min(0)]],
      stopLossUnit: ['Rs'],
      quantity: [50, [Validators.required, Validators.min(0)]],
      trailSLXPoint: [0, [Validators.required, Validators.min(0)]],
      trailSLYPoint: [0, [Validators.required, Validators.min(0)]],
      indicators: this.fb.array([
        this.fb.group({
          indicator: ['sma'],
          param1: [14],
          param2: [{ value: '', disabled: true }],
          operator: ['greater'],
          value1: [15000],
          value2: [{ value: '', disabled: true }],
        }),
      ]),
    });

    this.onIndicatorsValueChanges();
    this.stratergyFormGroup.get('direction').valueChanges.subscribe((val) => {
      this.toggleIndicatorValueField(val);
    });

    this.stratergyFormGroup.get('exchange').valueChanges.subscribe((val) => {
      this.stratergyFormGroup.get('dataSymbol').reset();
      this.stratergyFormGroup.get('orderSymbol').reset();
    });
    this.stratergyFormGroup.get('dataSymbol').valueChanges.subscribe((val) => {
      this.stratergyFormGroup.get('orderSymbol').reset();
    });
  }

  get indicators(): FormArray {
    return this.stratergyFormGroup.get('indicators') as FormArray;
  }

  onIndicatorsValueChanges() {
    this.indicators.controls.forEach((control, index) => {
      console.log('control...', control.value);
      control.get('operator').valueChanges.subscribe((val) => {
        if (val === 'signal') {
          control.get('value1').reset();
          control.get('value1').disable();
          control.get('value2').reset();
          control.get('value2').disable();
        } else {
          if (this.stratergyFormGroup.get('direction').value === 'BUY') {
            control.get('value1').enable();
            control.get('value2').disable();
          } else if (
            this.stratergyFormGroup.get('direction').value === 'SELL'
          ) {
            control.get('value1').disable();
            control.get('value2').enable();
          } else {
            control.get('value1').enable();
            control.get('value2').enable();
          }
        }
      });

      control.get('indicator').valueChanges.subscribe((val) => {
        if (val !== 'supertrend') {
          control.get('param2').disable();
        } else {
          control.get('param2').enable();
        }
      });
    });
  }

  onAddStratergy(formValues: any) {
    const stratergyJson = {};
    for (const key in formValues) {
      if (key === 'time') {
        stratergyJson['entryTime'] = this.formatTime(
          formValues[key]?.startTime
        );
        stratergyJson['exitTime'] = this.formatTime(formValues[key]?.endTime);
        continue;
      }
      stratergyJson[key] = formValues[key];
    }
    stratergyJson['active'] = true;
    stratergyJson['user'] = JSON.parse(localStorage.getItem('user'))._id;
    console.log('add..', stratergyJson);
    this.store.dispatch(new AddStratergy(stratergyJson));
  }

  onAddIndicator(event: any) {
    this.getIndicator.push(this.indicator);
    this.onIndicatorsValueChanges();
  }

  formatTime(time: any): string {
    const timeArr = time.split(':');
    const today = new Date();
    return new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      timeArr[0],
      timeArr[1],
      timeArr[2]
    ).toISOString();
  }

  toggleIndicatorValueField(value: string) {
    this.indicators.controls.forEach((control) => {
      if (value === 'BUY') {
        control.get('value1').enable();
        this.resetControl(control, 'value2');
        control.get('value2').disable();
      } else if (value === 'SELL') {
        this.resetControl(control, 'value1');
        control.get('value1').disable();
        control.get('value2').enable();
      } else {
        control.get('value1').enable();
        control.get('value2').enable();
      }
    });
  }

  resetControl(control: AbstractControl, field: string) {
    control.get(field).reset();
  }

  checkDisable(value: string): boolean {
    if (this.stratergyFormGroup.get('direction').value === value) return true;
    return false;
  }
}
