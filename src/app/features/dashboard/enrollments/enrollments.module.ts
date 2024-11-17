import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentsRoutingModule } from './enrollments-routing.module';
import { EnrollmentsComponent } from './enrollments.component';
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDialogModule } from "@angular/material/dialog";
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [EnrollmentsComponent],
  imports: [
    CommonModule,
    EnrollmentsRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    SharedModule
  ]
})
export class EnrollmentsModule {}
