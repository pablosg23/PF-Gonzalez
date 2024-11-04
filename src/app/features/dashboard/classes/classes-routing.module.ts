import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassesComponent } from './classes.component';
import { ClassDetailsComponent } from './class-details/class-details.component';
import { authGuard } from '../../../core/guards/auth.guard'; // Adjust path as needed
import { roleGuard } from '../../../core/guards/role.guard'; // Adjust path as needed

const routes: Routes = [
  {
    path: '',
    component: ClassesComponent,
    canActivate: [authGuard]
  },
  {
    path: ':id/detail',
    component: ClassDetailsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'add',
    component: ClassesComponent,
    canActivate: [authGuard, roleGuard] // Only admin can access add or edit
  },
  {
    path: ':id/edit',
    component: ClassesComponent,
    canActivate: [authGuard, roleGuard] // Only admin can edit
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesRoutingModule { }
