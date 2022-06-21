import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
      period: [''],
      multiplier: [''],
      candleParam: [''],
    });
  }

  ngOnInit(): void {
    this.initStratergyForm();
  }

  initStratergyForm(): void {
    this.stratergyFormGroup = this.fb.group({
      name: [''],
      direction: [''],
      timeFrame: [''],
      condition: [''],
      orderType: [''],
      target: [''],
      targetunit: [''],
      stopLoss: [''],
      stopLossunit: [''],
      quantity: [''],
      indicators: this.fb.array([this.indicator, this.indicator]),
    });
  }

  onAddStratergy(formValues: any) {
    console.log('formvalues...', formValues);
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
}
