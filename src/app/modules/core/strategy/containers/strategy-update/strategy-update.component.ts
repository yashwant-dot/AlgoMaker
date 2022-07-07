import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { getStrategyToUpdate, UpdateStrategy } from '../../+state';
import { StrategyService } from '../../services';

@Component({
  selector: 'app-strategy-update',
  templateUrl: './strategy-update.component.html',
  styleUrls: ['./strategy-update.component.scss'],
})
export class StrategyUpdateComponent implements OnInit {
  strategyFormGroup: FormGroup;
  strategyID: string;
  breadcrumbItems: any[] = [
    { label: 'Strategy', link: '../', active: false },
    { label: 'Update Strategy', active: true },
  ];
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private strategyServ: StrategyService
  ) {}

  get indicators(): FormArray {
    return this.strategyFormGroup.get('indicators') as FormArray;
  }

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

  ngOnInit(): void {
    this.store.select(getStrategyToUpdate).subscribe((data) => {
      if (data) {
        this.strategyID = data._id;
        this.initForm(data);
      }
    });
  }

  initForm(data: any) {
    console.log('data..', data);
    this.strategyFormGroup = this.strategyServ.initStrategyForm(data);
    console.log(this.strategyFormGroup);
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

  onUpdateStrategy(formValues: any) {
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
    this.store.dispatch(new UpdateStrategy(strategyJson, this.strategyID));
  }

  onAddIndicator(event: any) {
    this.indicators.push(this.indicator);
    this.onIndicatorsValueChanges();
  }

  onDeleteIndicator(index: number) {
    this.indicators.removeAt(index);
    this.onIndicatorsValueChanges();
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
}
