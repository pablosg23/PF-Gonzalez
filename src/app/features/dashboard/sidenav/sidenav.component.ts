import {Component} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  isAdmin$: Observable<boolean>;

  constructor(
    private authService: AuthService
  ) {
    this.isAdmin$ = this.authService.isAdmin();
  }

  logout() {
    this.authService.logout();
  }
}
