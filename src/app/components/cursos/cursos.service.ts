import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class CursosService extends BaseService {
  common: string = 'cursos/single'
  all(){
    this.setEndPoint('cursos/all');
    return this.get();
  }
  single(id){
    this.setEndPoint(`${this.common}/${id}`);
    return this.get();
  }
  
}
