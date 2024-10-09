import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentFullNamePipe } from './pipes/student-full-name.pipe';


@NgModule({
  declarations: [
    StudentFullNamePipe
  ],
  exports: [
    StudentFullNamePipe
  ],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }
