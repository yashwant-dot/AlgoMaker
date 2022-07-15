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
      pin: [''],
      totp_secret: ['', [Validators.required]],
    });

    this.zerodhaFormGroup.get('auth_type').valueChanges.subscribe((val) => {
      if (val === 'pin') {
        this.zerodhaFormGroup.get('pin').setValidators(Validators.required);
        this.zerodhaFormGroup.get('totp_secret').clearValidators();
        this.zerodhaFormGroup.get('totp_secret').setValue('');
      } else {
        this.zerodhaFormGroup
          .get('totp_secret')
          .setValidators(Validators.required);
        this.zerodhaFormGroup.get('pin').clearValidators();
        this.zerodhaFormGroup.get('pin').setValue('');
      }
    });
  }

  onAcceptForm(values: any) {
    this.store.dispatch(
      new AddAccount({
        ...values,
        user: JSON.parse(localStorage.getItem('user'))?._id,
      })
    );
  }
}
