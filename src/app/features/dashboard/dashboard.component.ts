import { Component } from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {Observable} from "rxjs";
import {User} from "../../models/User";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  authUser$: Observable<User | null>;
  constructor(
    private authService: AuthService
  ) {
    this.authUser$ = authService.authUser;
  }

}
