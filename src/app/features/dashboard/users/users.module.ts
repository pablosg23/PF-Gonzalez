import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from "../../../shared/shared.module";
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { UserDetailsComponent } from './user-details/user-details.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserDialogComponent,
    UserDetailsComponent
  ],
  exports: [
    UsersComponent,
    UserDialogComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatTableModule,
    MatDialogModule,
    SharedModule,
  ]
})
export class UsersModule { }
