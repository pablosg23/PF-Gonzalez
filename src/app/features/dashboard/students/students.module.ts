import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';


@NgModule({
  declarations: [
    StudentsComponent
  ],
  exports: [
    StudentsComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MatTableModule
  ]
})
export class StudentsModule { }
