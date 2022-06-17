import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent, InputComponent } from './components';
@NgModule({
  declarations: [DropdownComponent, InputComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [DropdownComponent, InputComponent],
})
export class SharedModule {}
