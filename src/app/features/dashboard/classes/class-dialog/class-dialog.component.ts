import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Class} from "../../../../models/Class";

interface ClassDialogData {
  editThisClass?: Class;
}

@Component({
  selector: 'app-class-dialog',
  templateUrl: './class-dialog.component.html',
  styleUrls: ['./class-dialog.component.scss']
})
export class ClassDialogComponent {
  classForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ClassDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClassDialogData
  ) {
    this.classForm = this.fb.group({
      name: [data.editThisClass?.name || '', Validators.required],
      description: [data.editThisClass?.description || '', Validators.required]
    });
  }

  submitClassData() {
    if (this.classForm.valid) {
      const classData = {
        ...this.classForm.value
      };
      this.dialogRef.close(classData);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
