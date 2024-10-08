import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { StudentsModule } from "./students/students.module";
import { UsersModule } from "./users/users.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    StudentsModule,
    UsersModule
  ]
})
export class DashboardModule { }
