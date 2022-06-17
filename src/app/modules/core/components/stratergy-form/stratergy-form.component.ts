import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
import { MatDialogRef } from '@angular/material/dialog';

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
  stratergyFormGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public formModalRef: MatDialogRef<StratergyFormComponent>
  ) {}

  ngOnInit(): void {
    this.initStratergyForm();
  }

  initStratergyForm(): void {
    this.stratergyFormGroup = this.fb.group({
      name: ['', Validators.required],
      direction: ['', [Validators.required]],
      timeFrame: ['', [Validators.required]],
      condition: ['', [Validators.required]],
      orderType: ['', [Validators.required]],
      target: ['', [Validators.required]],
      targetunit: ['', [Validators.required]],
      stopLoss: ['', [Validators.required]],
      stopLossunit: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
    });
  }

  // {
  //   name,
  //   entryTime,
  //   exitTime,
  //   direction,
  //   timeFrame,
  //   orderType,
  //   quantity,
  //   stopLoss,
  //   target,
  //   instrument1,
  //   period1,
  //   multiplier1,
  //   candleParam1,
  //   instrument2,
  //   period2,
  //   multiplier2,
  //   candleParam2,
  //   indicator1,
  //   indicator2,
  //   condition,
  //   targetunit,
  //   stopLossunit,
  // }

  onClick(formValues: any): void {
    console.log(formValues);
  }

  onClose(): void {
    this.formModalRef.close();
  }
}
