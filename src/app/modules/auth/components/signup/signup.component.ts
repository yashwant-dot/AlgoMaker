import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  hide = true;
  signupForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
}
