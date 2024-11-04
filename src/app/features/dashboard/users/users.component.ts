import { Component, OnInit } from '@angular/core';
import { User } from "../../../models/User";
import { MatDialog } from "@angular/material/dialog";
import { UsersService } from "../../../core/services/users.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserDialogComponent } from "./user-dialog/user-dialog.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'role', 'actions'];
  dataSource: User[] = [];
  loadingUsers: boolean = false;

  constructor(
    private dialog: MatDialog,
    private usersService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers() {
    this.loadingUsers = true;
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.dataSource = users;
        this.loadingUsers = false;
      }
    });
  }

  goToDetail(user: User) {
    this.router.navigate([user.id, 'detail'], { relativeTo: this.activatedRoute });
  }

  addUser(editUser?: User) {
    this.dialog.open(UserDialogComponent, {
      data: { editThisUser: editUser }
    }).afterClosed().subscribe({
      next: (user) => {
        if (user) {
          if (editUser) {
            this.handleUserUpdate(editUser, user);
          } else {
            this.handleUserAddition(user);
          }
        }
      }
    });
  }

  handleUserDeletion(userToDelete: User) {
    this.loadingUsers = true;
    this.usersService.deleteUser(userToDelete).subscribe({
      next: (users: User[]) => {
        this.dataSource = users;
        this.loadingUsers = false;
      }
    });
  }

  handleUserUpdate(user: User, newData: User) {
    this.loadingUsers = true;
    this.usersService.updateUser(user, newData).subscribe({
      next: (users: User[]) => {
        this.dataSource = users;
        this.loadingUsers = false;
      }
    });
  }

  handleUserAddition(newUser: User) {
    this.loadingUsers = true;
    this.usersService.addUser(newUser).subscribe({
      next: () => {
        this.loadUsers();
        this.loadingUsers = false;
      }
    });
  }
}
