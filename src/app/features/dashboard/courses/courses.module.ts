import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {SharedModule} from "../../../shared/shared.module";
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import {MatDialogContent, MatDialogTitle} from "@angular/material/dialog";


@NgModule({
  declarations: [
    CoursesComponent,
    CourseDialogComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatProgressSpinner,
    MatRow,
    MatRowDef,
    MatTable,
    SharedModule,
    MatDialogContent,
    MatDialogTitle
  ]
})
export class CoursesModule { }
