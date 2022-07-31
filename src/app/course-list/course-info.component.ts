import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Course } from "./course";
import { CourseService } from "./course.service";
//import { CommomModule } from "@angular/commom";

@Component({
    selector:'./course-info.component.ts',
    templateUrl:'./course-info.component.html',
    styleUrls: ['./course-info.component.css']
  }) 

export class CourseInfoComponent implements OnInit{
    course:  Course;

    constructor(private  activatedRoute: ActivatedRoute,
                private  courseService: CourseService ) {

    }
   ngOnInit(): void {
    console.log('CourseInfo');
    let idDoCurso = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('info id ',idDoCurso);

    this.courseService.retreaveById(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe ({
      next : course => {
           this.course = course;
           console.log("Url ",this.course.imageUrl);
           let varUrl = this.course.imageUrl;
           let novaUrl = varUrl.replace("png", "jpg");
           console.log("nova url ",novaUrl);
           this.course.imageUrl = novaUrl;
      },
      error : err => console.log('Erro na consulta por id : ',err)
        
      
    })
         
   }

   save(): void {
       this.courseService.salvar(this.course);
   }
}