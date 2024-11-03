import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { SharedModule } from "../../../shared/shared.module";
import { StudentDialogComponent } from './student-dialog/student-dialog.component';
import { StudentDetailsComponent } from './student-details/student-details.component';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentDialogComponent,
    StudentDetailsComponent
  ],
  exports: [
    StudentsComponent,
    StudentDialogComponent,
    StudentDetailsComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MatTableModule,
    MatDialogModule,
    SharedModule,
  ]
})
export class StudentsModule { }
