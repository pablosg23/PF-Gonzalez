import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassesService } from '../../../../core/services/classes.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Observable } from 'rxjs';
import {Class} from "../../../../models/Class";

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss']
})
export class ClassDetailsComponent implements OnInit {
  classDetail?: Class;

  constructor(
    private route: ActivatedRoute,
    private classesService: ClassesService,
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
    const classId = this.route.snapshot.params['id'];
    this.loadClassDetails(classId);
  }

  private loadClassDetails(id: string) {
    this.classesService.getClassById(id).subscribe({
      next: (classData) => {
        this.classDetail = classData;
      }
    });
  }

  getStudentName(studentId: string): string {
    // This function can look up a student by ID, perhaps from a cached service or hardcoded for now.
    // For simplicity, returning the student ID. Ideally, you could fetch from a students service.
    return studentId; // Replace with actual logic if student names are available
  }
}
