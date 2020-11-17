import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class CursosService extends BaseService {

  all(){
    this.setEndPoint('cursos/all');
    return this.get();
  }
  
}
