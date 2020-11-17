import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {environment} from './../../environments/environment';
import { SwalService } from './swal.service';
@Injectable({
  providedIn: 'root'
})
export class BaseService {
  urlServer: string = environment.url;
  // get , post, headers
  // location.href = "/"
  endpoint = '';
  constructor(private http:HttpClient, private router :Router, private Swal: SwalService) { }
  //me falta esta parte
  setEndPoint(endpoint: string) {
       this.endpoint = endpoint;
  }

  private getHttpOptions() {
    const httpOptions = {};
    const token = localStorage.getItem('JWT');
    token
      ? (httpOptions['headers'] = new HttpHeaders({
          Authorization: token,
        }))
      : null;

    return httpOptions;
  }


  async get() {
    // return await this.http.get(url).toPromise()
    try {
      return await this.http
        .get(`${this.urlServer}/${this.endpoint}`, this.getHttpOptions())
        .toPromise();
    } catch (e) {
      this.handlerError(e);
    }
  }
  async post(obj) {
    // return await this.http.get(url).toPromise()
    try {
      return await this.http
        .post(`${this.urlServer}/${this.endpoint}`, obj, this.getHttpOptions())
        .toPromise();
    } catch (e) {
      this.handlerError(e);
    }
  }

  handlerError(e) {
    this.Swal.normalMessage({html:'No tenés permiso', icon: 'error' , timer: 2000});
    e.status === 401 ? this.router.navigate(['login']) : null;
    e.status === 404 ? this.router.navigate(['notfound']) : null;
  }
}
