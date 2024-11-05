import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentsComponent } from './students.component';
import { StudentsService } from '../../../core/services/students.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Student } from "../../../models/Student";
import { MatDialogModule } from '@angular/material/dialog';
import {StudentDialogComponent} from "./student-dialog/student-dialog.component";
import {SharedModule} from "../../../shared/shared.module";
import {MatTableModule} from "@angular/material/table";

describe('StudentsComponent', () => {
  let component: StudentsComponent;
  let fixture: ComponentFixture<StudentsComponent>;
  let studentsService: jasmine.SpyObj<StudentsService>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let router: Router;
  const mockStudents: Student[] = [
    { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', createdAt: new Date('2024-11-04') },
    { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', createdAt: new Date('2024-11-05') }
  ];

  beforeEach(async () => {
    const studentsServiceSpy = jasmine.createSpyObj('StudentsService', ['getUsers', 'deleteStudent', 'updateStudent', 'addStudent']);
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [StudentsComponent],
      imports: [MatDialogModule, SharedModule, MatTableModule],
      providers: [
        { provide: StudentsService, useValue: studentsServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentsComponent);
    component = fixture.componentInstance;
    studentsService = TestBed.inject(StudentsService) as jasmine.SpyObj<StudentsService>;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load students on initialization', () => {
      studentsService.getUsers.and.returnValue(of(mockStudents));
      fixture.detectChanges();

      expect(studentsService.getUsers).toHaveBeenCalled();
      expect(component.dataSource).toEqual(mockStudents);
      expect(component.loadingStudents).toBeFalse();
    });
  });

  describe('goToDetail', () => {
    it('should navigate to the student detail page', () => {
      const navigateSpy = spyOn(router, 'navigate');
      const student: Student = mockStudents[0];

      component.goToDetail(student);

      expect(navigateSpy).toHaveBeenCalledWith([student.id, 'detail'], { relativeTo: TestBed.inject(ActivatedRoute) });
    });
  });

  describe('addStudent', () => {
    it('should open the dialog for adding a student', () => {
      dialog.open.and.returnValue({
        afterClosed: () => of(null)
      } as any);

      component.addStudent();

      expect(dialog.open).toHaveBeenCalledWith(StudentDialogComponent, {
        data: { editThisStudent: undefined }
      });
    });

    it('should handle student addition after dialog close', () => {
      const newStudent: Student = { id: '3', firstName: 'New', lastName: 'Student', email: 'new@example.com', createdAt: new Date() };
      dialog.open.and.returnValue({
        afterClosed: () => of(newStudent)
      } as any);
      spyOn(component, 'handleStudentAddition');

      component.addStudent();

      expect(component.handleStudentAddition).toHaveBeenCalledWith(newStudent);
    });
  });

  describe('handleStudentDeletion', () => {
    it('should delete the student and reload the list', () => {
      studentsService.deleteStudent.and.returnValue(of(mockStudents));

      component.handleStudentDeletion(mockStudents[0]);

      expect(studentsService.deleteStudent).toHaveBeenCalledWith(mockStudents[0]);
      expect(component.dataSource).toEqual(mockStudents);
      expect(component.loadingStudents).toBeFalse();
    });
  });

  describe('handleStudentUpdate', () => {
    it('should update the student and reload the list', () => {
      const updatedStudent: Student = { ...mockStudents[0], firstName: 'Updated' };
      studentsService.updateStudent.and.returnValue(of(mockStudents));

      component.handleStudentUpdate(mockStudents[0], updatedStudent);

      expect(studentsService.updateStudent).toHaveBeenCalledWith(mockStudents[0], updatedStudent);
      expect(component.dataSource).toEqual(mockStudents);
      expect(component.loadingStudents).toBeFalse();
    });
  });

  describe('handleStudentAddition', () => {
    it('should add a new student and reload the list', () => {
      studentsService.addStudent.and.returnValue(of(mockStudents[0]));
      spyOn(component, 'loadStudents');

      component.handleStudentAddition(mockStudents[0]);

      expect(studentsService.addStudent).toHaveBeenCalledWith(mockStudents[0]);
      expect(component.loadStudents).toHaveBeenCalled();
      expect(component.loadingStudents).toBeFalse();
    });
  });
});
