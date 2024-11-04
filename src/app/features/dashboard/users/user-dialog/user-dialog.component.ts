import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { User } from "../../../../models/User";

interface UserDialogData {
  editThisUser?: User
}

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent {
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: UserDialogData
  ) {
    this.initializeForm(data?.editThisUser);
  }

  private initializeForm(user?: User): void {
    const userData = user || { firstName: null, lastName: null, email: null, role: null };

    this.userForm = this.fb.group({
      firstName: [userData.firstName, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      lastName: [userData.lastName, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: [userData.email, [Validators.required, Validators.email]],
      role: [userData.role, Validators.required]
    });
  }

  submitUserData() {
    if (this.userForm.invalid) {
      this.userForm.markAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.userForm.value
      });
    }
  }

  closeDialog() {
    this.matDialogRef.close();
  }
}
