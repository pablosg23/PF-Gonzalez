import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentFullNamePipe } from './pipes/student-full-name.pipe';
import { AppTitleDirective } from './directives/app-title.directive';


@NgModule({
  declarations: [
    StudentFullNamePipe,
    AppTitleDirective
  ],
  exports: [
    StudentFullNamePipe,
    AppTitleDirective
  ],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }
