import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import {authGuard} from "../../core/guards/auth.guard";
import {roleGuard} from "../../core/guards/role.guard";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'users',
        canActivate: [authGuard, roleGuard],
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)

      },
      {
        path: 'students',
        loadChildren: () => import('./students/students.module').then(m => m.StudentsModule)
      },
      {
        path: 'courses',
        loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule)
      },
      {
        path: 'classes',
        loadChildren: () => import('./classes/classes.module').then(m => m.ClassesModule)
      },
      { path: '**', redirectTo: 'home' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
