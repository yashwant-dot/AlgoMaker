import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'shared-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent implements OnInit {
  public message: string;
  public type: string;
  public isEnableUndo: boolean;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public snackBarRef: MatSnackBarRef<SnackbarComponent>
  ) {
    this.message = data.message;
    this.type = data.type;
    this.isEnableUndo = data.isEnableUndo;
  }

  ngOnInit(): void {}
}
