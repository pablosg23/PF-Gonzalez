import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { studentsFeatureKey, studentsReducer } from './store/student.reducer';
import { StudentEffects } from './store/student.effects';
import { StudentsComponent } from './students.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [StudentsComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(studentsFeatureKey, studentsReducer),
    EffectsModule.forFeature([StudentEffects]),
    SharedModule,
  ],
})
export class StudentsModule {}
