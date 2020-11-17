import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SwalService } from 'src/app/services/swal.service';
import { RegistroService } from './registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  loaded : boolean = false;
  constructor(private service: RegistroService, private swal: SwalService) { }

form: FormGroup;
FormObject: any = {
  usuario: new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]),
  password: new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(20),
  ]),
  nombre: new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]),
  apellido: new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]),
  mail: new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.minLength(5),
  ]),
  telefono: new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]),
}

  verifyField(field:string) : string{
    const element = this.form.controls[field];
    let message = "";
    element.status === "INVALID" && element.touched 
    ? message = `El campo ${field} es obligatorio` : '';
    return message;
  }

  ngOnInit(): void {
    this.form = new FormGroup(this.FormObject);
    setTimeout(() => {
      this.loaded = !this.loaded;
    }, 1500);
  }
  async registro(){
    // this.swal.normalMessage({html: 'Te enviamos un correo para que confirmes tu registro'});
    const result: any = await this.service.create(this.form.value);
    console.log(result);
    // console.log('ohh registro');
    // console.log(this.form);
    // console.log(this.form.value)
  }

}

