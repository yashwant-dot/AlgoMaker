import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { brokerOptions, authTypeOptions } from '../../models';

@Component({
  selector: 'app-zerodha-form',
  templateUrl: './zerodha-form.component.html',
  styleUrls: ['./zerodha-form.component.scss'],
})
export class ZerodhaFormComponent implements OnInit {
  @Input() zerodhaFormGroup: FormGroup;
  @Output() onAcceptForm: EventEmitter<any> = new EventEmitter();
  brokerOptions = brokerOptions;
  authTypeOptions = authTypeOptions;
  constructor() {}

  ngOnInit(): void {}
}
