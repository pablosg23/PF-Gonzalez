import {Component} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  constructor(
    public authService: AuthService
  ) {
  }

  logout() {
    this.authService.logout();
  }
}
