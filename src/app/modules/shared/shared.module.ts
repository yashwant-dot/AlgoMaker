import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  DropdownComponent,
  InputComponent,
  PageTitleComponent,
} from './components';
@NgModule({
  declarations: [DropdownComponent, InputComponent, PageTitleComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [DropdownComponent, InputComponent, PageTitleComponent],
})
export class SharedModule {}
