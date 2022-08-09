import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { brokerOptions, authTypeOptions } from '../../models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss'],
})
export class AccountFormComponent implements OnInit {
  accountFormGroup: FormGroup;
  brokerOptions = brokerOptions;
  authTypeOptions = authTypeOptions;
  account: any;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AccountFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    if (data) {
      this.account = data;
      console.log('add account form...', data);
    }
  }

  ngOnInit(): void {
    this.initFormGroup();
  }

  initFormGroup(): void {
    this.accountFormGroup = this.fb.group({
      userID: [
        this.account?.userID ? this.account.userID : null,
        [Validators.required],
      ],
      broker: [
        this.account?.broker ? this.account.broker : 'zerodha',
        [Validators.required],
      ],
      password: [
        this.account?.password ? this.account.password : null,
        [Validators.required],
      ],
      auth_type: [this.account?.auth_type ? this.account.auth_type : 'totp'],
      pin: [this.account?.pin ? this.account.pin : null],
      totp_secret: [
        this.account?.totp_secret ? this.account.totp_secret : null,
        [Validators.required],
      ],
    });

    this.accountFormGroup.get('auth_type').valueChanges.subscribe((val) => {
      if (val === 'pin') {
        this.accountFormGroup.get('pin').setValidators(Validators.required);
        this.accountFormGroup.get('totp_secret').clearValidators();
        this.accountFormGroup.get('totp_secret').setValue('');
      } else {
        this.accountFormGroup
          .get('totp_secret')
          .setValidators(Validators.required);
        this.accountFormGroup.get('pin').clearValidators();
        this.accountFormGroup.get('pin').setValue('');
      }
    });
  }

  onClose() {
    this.dialogRef.close(false);
  }

  onSubmit(values) {
    this.dialogRef.close(values);
  }
}
