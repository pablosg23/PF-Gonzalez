import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrl: './student-dialog.component.scss'
})
export class StudentDialogComponent {
  studentForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<StudentDialogComponent>,
              ) {
    this.studentForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]]
    });
  }

  submitStudentData() {
    if (this.studentForm.invalid){
      this.studentForm.markAsTouched();
    } else {
      this.matDialogRef.close(
        {
          ...this.studentForm.value,
          id: 1, //TODO: generate uuid
          createdAt: new Date()
        });
    }
  }

  closeDialog() {
    this.matDialogRef.close();
  }
}
