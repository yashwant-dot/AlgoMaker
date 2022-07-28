import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { brokerOptions, authTypeOptions } from '../../models';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-account-form',
  templateUrl: './add-account-form.component.html',
  styleUrls: ['./add-account-form.component.scss'],
})
export class AddAccountFormComponent implements OnInit {
  addAccountFormGroup: FormGroup;
  brokerOptions = brokerOptions;
  authTypeOptions = authTypeOptions;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddAccountFormComponent>
  ) {}

  ngOnInit(): void {
    this.initFormGroup();
  }

  initFormGroup(): void {
    this.addAccountFormGroup = this.fb.group({
      userID: ['', [Validators.required]],
      broker: ['zerodha', [Validators.required]],
      password: ['', [Validators.required]],
      auth_type: ['totp'],
      pin: [''],
      totp_secret: ['', [Validators.required]],
    });

    this.addAccountFormGroup.get('auth_type').valueChanges.subscribe((val) => {
      if (val === 'pin') {
        this.addAccountFormGroup.get('pin').setValidators(Validators.required);
        this.addAccountFormGroup.get('totp_secret').clearValidators();
        this.addAccountFormGroup.get('totp_secret').setValue('');
      } else {
        this.addAccountFormGroup
          .get('totp_secret')
          .setValidators(Validators.required);
        this.addAccountFormGroup.get('pin').clearValidators();
        this.addAccountFormGroup.get('pin').setValue('');
      }
    });
  }

  onClose() {
    this.dialogRef.close(false);
  }

  onAddAccount(values) {
    this.dialogRef.close(values);
  }
}
