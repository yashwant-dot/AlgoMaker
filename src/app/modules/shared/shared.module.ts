import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  DropdownComponent,
  InputComponent,
  PageTitleComponent,
  SnackbarComponent,
  ConfirmationDialogComponent,
} from './components';
@NgModule({
  declarations: [
    DropdownComponent,
    InputComponent,
    PageTitleComponent,
    SnackbarComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    DropdownComponent,
    InputComponent,
    PageTitleComponent,
    SnackbarComponent,
    ConfirmationDialogComponent,
  ],
})
export class SharedModule {}
