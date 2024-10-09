import { Pipe, PipeTransform } from '@angular/core';
import { Student } from "../../models/Student";

@Pipe({
  name: 'studentFullName'
})
export class StudentFullNamePipe implements PipeTransform {

  transform(value: Student, ...args: unknown[]): string {
    return value.firstName + ' ' + value.lastName;
  }

}
