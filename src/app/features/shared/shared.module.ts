import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentFullNamePipe} from './pipes/student-full-name.pipe';
import {AppTitleDirective} from './directives/app-title.directive';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    StudentFullNamePipe,
    AppTitleDirective
  ],
  exports: [
    StudentFullNamePipe,
    AppTitleDirective,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule
  ],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }
