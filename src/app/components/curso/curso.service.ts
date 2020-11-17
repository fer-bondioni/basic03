import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class CursoService extends BaseService {
  single(id){
    this.setEndPoint('curso/:id');
    return this.get();
  }
}
