import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { StudentsModule } from "./students/students.module";
import { UsersModule } from "./users/users.module";
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from "../shared/shared.module";


@NgModule({
  declarations: [
    DashboardComponent
  ],
  exports: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    StudentsModule,
    UsersModule,
    SharedModule
  ]
})
export class DashboardModule { }
