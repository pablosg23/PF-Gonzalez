import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./features/dashboard/dashboard.component";
import {AuthComponent} from "./features/auth/auth.component";
import {LoginComponent} from "./features/auth/login/login.component";
import {RegisterComponent} from "./features/auth/register/register.component";
import {HomeComponent} from "./features/dashboard/home/home.component";
import {StudentsComponent} from "./features/dashboard/students/students.component";
import {StudentDetailsComponent} from "./features/dashboard/students/student-details/student-details.component";

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      },
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'students',
        children:
        [
          {
            path: '',
            component: StudentsComponent
          },
          {
            path: ':id/detail',
            component: StudentDetailsComponent
          }
        ]
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
