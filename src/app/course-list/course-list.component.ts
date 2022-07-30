import { Component, OnInit } from '@angular/core';
import { Course } from './course';
import { CourseService } from './course.service';

@Component({
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  constructor(private courseService : CourseService) {}
   _cursos : Course[] = [];
   filteredCourses:  Course[] = [];

  _filterBY : string;

  ngOnInit(): void {
    console.log('CourseList');
    this.retreaveAll();
  }

  retreaveAll() {
    this.courseService.retreaveAll().subscribe({
      next : courses => {
        this._cursos = courses;
        console.log('curso ',this._cursos[0].name);
        this.filteredCourses = this._cursos;
       },
       error : err => console.log("Erro na consulta : ",err)
    });
   
  }
  
  set filter(value: string) {
     this._filterBY = value;
     this.filteredCourses = this._cursos.filter((ocurso:Course) => ocurso.name.toLocaleLowerCase().indexOf(this._filterBY.toLocaleLowerCase()) > -1)
  }
  
  get filter() {
    return this._filterBY;
  }
}
