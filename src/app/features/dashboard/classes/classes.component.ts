import { Component, OnInit } from '@angular/core';
import { ClassesService } from "../../../core/services/classes.service";
import { Class } from "../../../models/Class";
import { MatDialog } from "@angular/material/dialog";
import { ClassDialogComponent } from "./class-dialog/class-dialog.component";
import { AuthService } from "../../../core/services/auth.service";
import { Observable } from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {StudentsService} from "../../../core/services/students.service";

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'students', 'actions'];
  dataSource: Class[] = [];
  loadingClasses = false;
  isAdmin$: Observable<boolean>;

  constructor(
    private classesService: ClassesService,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.isAdmin$ = this.authService.isAdmin();
  }

  ngOnInit() {
    this.loadClasses();
  }

  private loadClasses() {
    this.loadingClasses = true;
    this.classesService.getClasses().subscribe({
      next: (classes) => {
        this.dataSource = classes;
        this.loadingClasses = false;
      }
    });
  }

  getStudentName(studentId: string): string {
    return studentId;
  }

  openClassDialog(editClass?: Class) {
    this.dialog.open(ClassDialogComponent, {
      data: { editThisClass: editClass }
    }).afterClosed().subscribe({
      next: (result) => {
        if (result) {
          editClass ? this.loadClasses() : this.loadClasses();
        }
      }
    });
  }

  deleteClass(classToDelete: Class) {
    this.loadingClasses = true;
    this.classesService.deleteClass(classToDelete.id).subscribe({
      next: () => this.loadClasses()
    });
  }

  viewDetails(selectedClass: Class) {
    this.router.navigate([selectedClass.id, 'detail'], { relativeTo: this.activatedRoute });
  }
}
