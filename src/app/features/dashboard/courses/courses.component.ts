import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit{
  loadingCourses: boolean = false;
  longText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dolor ducimus et explicabo facere ipsam laudantium magni perspiciatis, soluta. Alias aliquam atque earum harum in iure quas repellat temporibus voluptas.';

  constructor() {
  }

  ngOnInit() {
  }

  addCourse(){

  }

}
