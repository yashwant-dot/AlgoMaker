import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { getStrategyToUpdate, UpdateStrategy } from '../../+state';
import { StrategyService, StratergyFormService } from '../../services';

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
  indicatorError: string;
  constructor(
    private store: Store,
    private strategyFormService: StratergyFormService
  ) {}

  get indicators(): FormArray {
    return this.strategyFormGroup.get('indicators') as FormArray;
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
    this.strategyFormGroup = this.strategyFormService.initStrategyForm(data);
    this.strategyFormService.onIndicatorsValueChanges(
      this.indicators,
      this.strategyFormGroup
    );
    this.strategyFormGroup.get('direction').valueChanges.subscribe((val) => {
      this.strategyFormService.toggleIndicatorValueField(this.indicators, val);
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

        if (val === 'greater') {
          control.get('operator2').setValue('less');
          control.get('operator2').disable();
        } else if (val === 'less') {
          control.get('operator2').setValue('greater');
          control.get('operator2').disable();
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
        strategyJson['entryTime'] = this.strategyFormService.formatTime(
          formValues[key]?.entryTime
        );
        strategyJson['exitTime'] = this.strategyFormService.formatTime(
          formValues[key]?.exitTime
        );
        continue;
      }
      strategyJson[key] = formValues[key];
      if (this.strategyFormService.checkKeyForNumber(key)) {
        strategyJson[key] = parseInt(formValues[key]);
      }
      if (key === 'indicators' && formValues['direction'] === 'SELL') {
        strategyJson[key] = formValues[key]?.map((indi) => {
          return {
            ...indi,
            operator2: indi?.operator1,
            operator1: null,
          };
        });
      }
    }
    strategyJson['active'] = true;
    console.log('update json...', strategyJson);
    this.store.dispatch(new UpdateStrategy(strategyJson, this.strategyID));
  }

  onAddIndicator(event: any) {
    if (this.indicators.length >= 5) {
      this.indicatorError = 'Cannot add more than 5 indicators';
      this.hideIndicatorError();
      return;
    }
    this.indicators.push(
      this.strategyFormService.getNewIndicatorFormGroup(this.strategyFormGroup)
    );
    this.strategyFormService.onIndicatorsValueChanges(
      this.indicators,
      this.strategyFormGroup
    );
  }

  onDeleteIndicator(index: number) {
    if (this.indicators.length <= 1) {
      this.indicatorError = 'There should be atleast 1 indicator';
      this.hideIndicatorError();
      return;
    }
    this.indicators.removeAt(index);
    this.strategyFormService.onIndicatorsValueChanges(
      this.indicators,
      this.strategyFormGroup
    );
  }

  hideIndicatorError() {
    setTimeout(() => {
      this.indicatorError = '';
    }, 5000);
  }
}
