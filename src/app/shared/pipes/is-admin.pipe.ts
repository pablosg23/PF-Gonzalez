import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../models/User';

@Pipe({
  name: 'isAdmin'
})
export class IsAdminPipe implements PipeTransform {
  transform(user: User | null): boolean {
    return user?.role === 'ADMIN';
  }
}
