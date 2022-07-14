import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AddAccount, getAccountData } from '../../+state';

@Component({
  selector: 'app-zerodha',
  templateUrl: './zerodha.component.html',
  styleUrls: ['./zerodha.component.scss'],
})
export class ZerodhaComponent implements OnInit {
  zerodhaFormGroup: FormGroup;
  constructor(private fb: FormBuilder, private store: Store<any>) {}

  ngOnInit(): void {
    this.initFormGroup();
    this.store.select(getAccountData);
  }

  initFormGroup(): void {
    this.zerodhaFormGroup = this.fb.group({
      userID: ['', [Validators.required]],
      broker: ['zerodha', [Validators.required]],
      password: ['', [Validators.required]],
      auth_type: ['totp'],
      pin: ['', [Validators.required]],
      totp_secret: ['', [Validators.required]],
    });
  }

  onAcceptForm(values: any) {
    this.store.dispatch(
      new AddAccount({
        ...values,
        user: JSON.parse(localStorage.getItem('user')),
      })
    );
  }
}
