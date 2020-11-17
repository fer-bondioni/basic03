import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursosService } from '../cursos/cursos.service';
import { CursoService } from './curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {
  curso: Array<Object> = [];
  constructor(private activatedRoute: ActivatedRoute, private service: CursoService) { }
  
  async ngOnInit() {
  this.loadCurso();
}

async loadCurso(){
  const params = this.activatedRoute.snapshot.params.id;
  console.log(params);
  const curso:any = await this.service.single(params);
  this.curso = curso;
}

}
