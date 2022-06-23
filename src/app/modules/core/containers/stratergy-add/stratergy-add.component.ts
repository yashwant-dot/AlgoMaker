import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  FormArray,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

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
  constructor(private fb: FormBuilder) {}

  get indicator(): FormGroup {
    return this.fb.group({
      indicator: [''],
      param1: [''],
      param2: [''],
      operator: [''],
      value1: [''],
      value2: [''],
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
      name: [''],
      time: this.fb.group(
        {
          startTime: ['09:20:00'],
          endTime: ['15:10:00'],
        },
        { validators: RangeValidator }
      ),
      direction: ['BUY'],
      timeFrame: [5],
      condition: [''],
      orderType: ['MIS'],
      exchange: ['fut_fut'],
      dataSymbol: ['NIFTY_FUT'],
      orderSymbol: ['NIFTY_FUT'],
      target: [0],
      targetunit: ['Rs'],
      stopLoss: [0],
      stopLossunit: ['Rs'],
      quantity: [50],
      trailSLXPoint: [0],
      trailSLYPoint: [0],
      indicators: this.fb.array([
        this.fb.group({
          indicator: ['sma'],
          param1: [14],
          param2: [''],
          operator: ['greater'],
          value1: [15000],
          value2: [''],
        }),
      ]),
    });
    this.indicators.controls.forEach((control, index) => {
      control.get('operator').valueChanges.subscribe((val) => {
        if (val === 'signal') {
          control.get('value2').reset();
          control.get('value2').disable();
          return;
        }
        control.get('value2').enable();
      });
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

  onAddStratergy(formValues: any) {
    console.log('formvalues...', this.stratergyFormGroup);
  }

  onAddIndicator(event: any) {
    this.getIndicator.push(this.indicator);
  }
}
