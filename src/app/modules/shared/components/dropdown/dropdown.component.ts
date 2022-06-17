import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'shared-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  @Input() placeholder!: string;
  @Input() dropdownForm!: FormGroup;
  @Input() dropdownControl!: string;
  @Input() isRequired: boolean = false;
  @Input() optionsData!: any[];
  constructor() {}

  ngOnInit(): void {}
}
