import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { StudentsModule } from "./students/students.module";
import { UsersModule } from "./users/users.module";
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from "../../shared/shared.module";
import { SidenavComponent } from './sidenav/sidenav.component';
import {HomeModule} from "./home/home.module";
import {CoursesModule} from "./courses/courses.module";


@NgModule({
  declarations: [
    DashboardComponent,
    SidenavComponent
  ],
  exports: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    StudentsModule,
    UsersModule,
    SharedModule,
    HomeModule,
    CoursesModule
  ]
})
export class DashboardModule { }
