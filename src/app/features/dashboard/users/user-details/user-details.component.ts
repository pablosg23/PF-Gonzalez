import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UsersService } from "../../../../core/services/users.service";
import { User } from "../../../../models/User";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  idUser?: string;
  user?: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService
  ) {
    this.idUser = activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.usersService.getById(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (user) => {
        this.user = user;
      }
    });
  }
}
