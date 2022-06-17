import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'shared-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() label!: string;
  @Input() inputForm!: FormGroup;
  @Input() inputControl!: string;
  @Input() isRequired: boolean = false;
  @Input() type!: string;
  constructor() {}

  ngOnInit(): void {}
}
