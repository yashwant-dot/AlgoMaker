import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from './components';
import { SnackbarConfig } from './components/snackbar/snackbar.config';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(type, message) {
    this.snackBar.openFromComponent(
      SnackbarComponent,
      SnackbarConfig(type, message)
    );
  }
}
