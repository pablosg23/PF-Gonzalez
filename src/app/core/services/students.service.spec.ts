import { TestBed } from '@angular/core/testing';
import { StudentsService } from './students.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Student } from '../../models/Student';
import { environment } from '../../../environments/environment';

describe('StudentsService', () => {
  let service: StudentsService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiBaseURL + '/students';

  const mockStudents: Student[] = [
    { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', createdAt: new Date('2024-11-04T00:00:00Z') },
    { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', createdAt: new Date('2024-11-05T00:00:00Z') }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StudentsService]
    });
    service = TestBed.inject(StudentsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsers', () => {
    it('should retrieve students from the API via GET', () => {
      service.getUsers().subscribe((students) => {
        expect(students.length).toBe(2);
        expect(students).toEqual(mockStudents);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockStudents);
    });
  });

  describe('updateStudent', () => {
    it('should update a student and fetch updated list', () => {
      const studentToUpdate: Student = mockStudents[0];
      const updatedStudent: Student = { ...studentToUpdate, firstName: 'UpdatedName' };
      const updatedList: Student[] = [updatedStudent, mockStudents[1]];

      service.updateStudent(studentToUpdate, updatedStudent).subscribe((students) => {
        expect(students).toEqual(updatedList);
      });

      const updateReq = httpMock.expectOne(`${apiUrl}/${studentToUpdate.id}`);
      expect(updateReq.request.method).toBe('PATCH');
      updateReq.flush(updatedStudent);

      const getReq = httpMock.expectOne(apiUrl);
      expect(getReq.request.method).toBe('GET');
      getReq.flush(updatedList);
    });
  });

  describe('deleteStudent', () => {
    it('should delete a student and fetch updated list', () => {
      const studentToDelete: Student = mockStudents[0];
      const updatedList: Student[] = [mockStudents[1]];

      service.deleteStudent(studentToDelete).subscribe((students) => {
        expect(students).toEqual(updatedList);
      });

      const deleteReq = httpMock.expectOne(`${apiUrl}/${studentToDelete.id}`);
      expect(deleteReq.request.method).toBe('DELETE');
      deleteReq.flush(null);

      const getReq = httpMock.expectOne(apiUrl);
      expect(getReq.request.method).toBe('GET');
      getReq.flush(updatedList);
    });
  });

  describe('getById', () => {
    it('should retrieve a student by ID from the API via GET', () => {
      const studentId = '1';
      const expectedStudent: Student = mockStudents[0];

      service.getById(studentId).subscribe((student) => {
        expect(student).toEqual(expectedStudent);
      });

      const req = httpMock.expectOne(`${apiUrl}/${studentId}`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedStudent);
    });
  });
});
