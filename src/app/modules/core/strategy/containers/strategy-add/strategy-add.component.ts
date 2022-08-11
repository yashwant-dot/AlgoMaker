import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AddStrategy } from '../../+state';
import { StratergyFormService } from '../../services';

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
  indicatorError: string;
  constructor(
    private store: Store,
    private strategyFormService: StratergyFormService
  ) {}

  ngOnInit(): void {
    this.initStrategyForm();
  }

  initStrategyForm(): void {
    this.strategyFormGroup = this.strategyFormService.initStrategyForm(
      this.strategyFormData
    );
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

  get indicators(): FormArray {
    return this.strategyFormGroup.get('indicators') as FormArray;
  }

  onAddStrategy(formValues: any) {
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
    strategyJson['user'] = JSON.parse(localStorage.getItem('user'))._id;
    console.log('form values...', formValues);
    console.log('add...', strategyJson);
    // this.store.dispatch(new AddStrategy(strategyJson));
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
