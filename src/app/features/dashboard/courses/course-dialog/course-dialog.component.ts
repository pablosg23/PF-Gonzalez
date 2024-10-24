import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoursesComponent} from "../courses.component";
import {Course} from "../../../../models/Course";
import {MatChipInputEvent} from '@angular/material/chips';
import {LiveAnnouncer} from '@angular/cdk/a11y';

interface CourseDialogData {
  editCourse?: Course;
}

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss']
})
export class CourseDialogComponent {
  courseForm!: FormGroup;
  isEdition: boolean = false;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<CoursesComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: CourseDialogData,
  ) {
    this.initializeForm(data?.editCourse);
  }

  private initializeForm(course?: Course): void {
    const courseData = course || { name: null, details: null, tags: [] };

    this.isEdition = !!course;

    this.courseForm = this.fb.group({
      name: [courseData.name, Validators.required],
      details: [courseData.details, Validators.required],
      tags: [courseData.tags]
    });
  }

  get tagsControl(): FormControl {
    return this.courseForm.get('tags') as FormControl;
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      const tags = this.tagsControl.value as string[];
      tags.push(value);
      this.tagsControl.setValue(tags);
    }
    event.chipInput!.clear();
  }

  removeTag(tag: string): void {
    const tags = this.tagsControl.value as string[];
    const index = tags.indexOf(tag);
    if (index >= 0) {
      tags.splice(index, 1);
      this.tagsControl.setValue(tags);
    }
  }

  submitCourseData() {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.courseForm.value,
        id: this.data?.editCourse
          ? this.data.editCourse.id
          : Math.random().toString(36).substring(2) + '-' + Date.now().toString(36),
      });
    }
  }

  closeDialog() {
    this.matDialogRef.close();
  }
}
