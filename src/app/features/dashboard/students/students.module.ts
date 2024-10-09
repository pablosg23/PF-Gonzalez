import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { SharedModule } from "../../shared/shared.module";
import { StudentDialogComponent } from './student-dialog/student-dialog.component';
import { MatDialogContent, MatDialogTitle } from "@angular/material/dialog";


@NgModule({
  declarations: [
    StudentsComponent,
    StudentDialogComponent
  ],
  exports: [
    StudentsComponent,
    StudentDialogComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MatTableModule,
    SharedModule,
    MatDialogTitle,
    MatDialogContent,
  ]
})
export class StudentsModule { }
