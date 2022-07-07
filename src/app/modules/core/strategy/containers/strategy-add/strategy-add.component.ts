import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AddStrategy } from '../../+state';
import { StrategyService } from '../../services';

@Component({
  selector: 'app-strategy-add',
  templateUrl: './strategy-add.component.html',
  styleUrls: ['./strategy-add.component.scss'],
})
export class StrategyAddComponent implements OnInit {
  strategyFormGroup!: FormGroup;
  breadcrumbItems: any[] = [
    { label: 'Strategy', link: '../', active: false },
    { label: 'Add Strategy', active: true },
  ];
  strategyFormData: any = {};
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private strategyServ: StrategyService
  ) {}

  get indicator(): FormGroup {
    return this.fb.group({
      indicator: [''],
      param1: [''],
      param2: [''],
      operator1: [''],
      operator2: [''],
      value1: [{ value: '', disabled: this.checkDisable('SELL') }],
      value2: [{ value: '', disabled: this.checkDisable('BUY') }],
    });
  }

  get getIndicator(): FormArray {
    return <FormArray>this.strategyFormGroup.get('indicators');
  }

  ngOnInit(): void {
    this.initStrategyForm();
  }

  initStrategyForm(): void {
    this.strategyFormGroup = this.strategyServ.initStrategyForm(
      this.strategyFormData
    );
    this.onIndicatorsValueChanges();
    this.strategyFormGroup.get('direction').valueChanges.subscribe((val) => {
      this.toggleIndicatorValueField(val);
    });

    this.strategyFormGroup.get('exchange').valueChanges.subscribe((val) => {
      this.strategyFormGroup.get('dataSymbol').reset();
      this.strategyFormGroup.get('orderSymbol').reset();
    });
    this.strategyFormGroup.get('dataSymbol').valueChanges.subscribe((val) => {
      this.strategyFormGroup.get('orderSymbol').reset();
    });
  }

  get indicators(): FormArray {
    return this.strategyFormGroup.get('indicators') as FormArray;
  }

  onIndicatorsValueChanges() {
    this.indicators.controls.forEach((control, index) => {
      control.get('operator1').valueChanges.subscribe((val) => {
        if (val === 'signal') {
          control.get('value1').reset();
          control.get('value1').disable();
          control.get('value2').reset();
          control.get('value2').disable();
        } else {
          if (this.strategyFormGroup.get('direction').value === 'BUY') {
            control.get('value1').enable();
            control.get('value2').disable();
          } else if (this.strategyFormGroup.get('direction').value === 'SELL') {
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

  onAddStrategy(formValues: any) {
    const strategyJson = {};
    for (const key in formValues) {
      if (key === 'time') {
        strategyJson['entryTime'] = this.formatTime(formValues[key]?.entryTime);
        strategyJson['exitTime'] = this.formatTime(formValues[key]?.exitTime);
        continue;
      }
      strategyJson[key] = formValues[key];
    }
    strategyJson['active'] = true;
    strategyJson['user'] = JSON.parse(localStorage.getItem('user'))._id;
    console.log('add...', strategyJson);
    this.store.dispatch(new AddStrategy(strategyJson));
  }

  onAddIndicator(event: any) {
    this.getIndicator.push(this.indicator);
    this.onIndicatorsValueChanges();
  }

  onDeleteIndicator(index: number) {
    this.getIndicator.removeAt(index);
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
      timeArr[1]
    ).toISOString();
  }

  toggleIndicatorValueField(value: string) {
    this.indicators.controls.forEach((control) => {
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
        control.get('value2').enable();
      }
    });
  }

  resetControl(control: AbstractControl, field: string) {
    control.get(field).reset();
  }

  checkDisable(value: string): boolean {
    if (this.strategyFormGroup.get('direction').value === value) return true;
    return false;
  }
}
