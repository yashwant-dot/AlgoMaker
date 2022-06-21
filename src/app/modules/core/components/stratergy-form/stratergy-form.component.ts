import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import {
  directionOptions,
  timeframeOptions,
  indicatorOptions,
  candleParamOptions,
  conditionOptions,
  orderTypeOptions,
  targetUnitOptions,
  stopLossUnitOptions,
} from '../../models';

@Component({
  selector: 'app-stratergy-form',
  templateUrl: './stratergy-form.component.html',
  styleUrls: ['./stratergy-form.component.scss'],
})
export class StratergyFormComponent implements OnInit {
  directionOptions = directionOptions;
  timeframeOptions = timeframeOptions;
  indicatorOptions = indicatorOptions;
  candleParamOptions = candleParamOptions;
  conditionOptions = conditionOptions;
  orderTypeOptions = orderTypeOptions;
  targetUnitOptions = targetUnitOptions;
  stopLossUnitOptions = stopLossUnitOptions;
  @Input() stratergyFormGroup!: FormGroup;
  @Output() addStratergy: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    console.log('form..', this.stratergyFormGroup);
  }

  get indicators(): FormArray {
    return this.stratergyFormGroup.get('indicators') as FormArray;
  }
}
