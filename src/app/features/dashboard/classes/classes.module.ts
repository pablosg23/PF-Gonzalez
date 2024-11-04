import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesComponent } from './classes.component';
import { ClassDialogComponent } from './class-dialog/class-dialog.component';
import { ClassDetailsComponent } from './class-details/class-details.component';
import { SharedModule } from "../../../shared/shared.module";

@NgModule({
  declarations: [
    ClassesComponent,
    ClassDialogComponent,
    ClassDetailsComponent
  ],
  imports: [
    CommonModule,
    ClassesRoutingModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ClassesModule { }
