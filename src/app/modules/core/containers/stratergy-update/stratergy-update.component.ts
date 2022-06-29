import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { getStratergyToUpdate, UpdateStratergy } from '../../+state';
import { CoreService } from '../../core.service';

@Component({
  selector: 'app-stratergy-update',
  templateUrl: './stratergy-update.component.html',
  styleUrls: ['./stratergy-update.component.scss'],
})
export class StratergyUpdateComponent implements OnInit {
  stratergyFormGroup: FormGroup;
  stratergyID: string;
  breadcrumbItems: any[] = [
    { label: 'Stratergy', link: 'admin/stratergy', active: false },
    { label: 'Update Stratergy', active: true },
  ];
  constructor(
    private store: Store,
    private coreServ: CoreService,
    private fb: FormBuilder
  ) {}

  get indicators(): FormArray {
    return this.stratergyFormGroup.get('indicators') as FormArray;
  }

  get indicator(): FormGroup {
    return this.fb.group({
      indicator: [''],
      param1: [''],
      param2: [''],
      operator: [''],
      value1: [{ value: '', disabled: this.checkDisable('SELL') }],
      value2: [{ value: '', disabled: this.checkDisable('BUY') }],
    });
  }

  ngOnInit(): void {
    this.store.select(getStratergyToUpdate).subscribe((data) => {
      if (data) {
        this.stratergyID = data._id;
        this.initForm(data);
      }
    });
  }

  initForm(data: any) {
    console.log('data..', data);
    this.stratergyFormGroup = this.coreServ.initStratergyForm(data);
    console.log(this.stratergyFormGroup);
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

  onIndicatorsValueChanges() {
    this.indicators.controls.forEach((control, index) => {
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

  onUpdateStratergy(formValues: any) {
    const stratergyJson = {};
    for (const key in formValues) {
      if (key === 'time') {
        stratergyJson['entryTime'] = this.formatTime(
          formValues[key]?.entryTime
        );
        stratergyJson['exitTime'] = this.formatTime(formValues[key]?.exitTime);
        continue;
      }
      stratergyJson[key] = formValues[key];
    }
    stratergyJson['active'] = true;
    this.store.dispatch(new UpdateStratergy(stratergyJson, this.stratergyID));
  }

  onAddIndicator(event: any) {
    this.indicators.push(this.indicator);
    this.onIndicatorsValueChanges();
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
