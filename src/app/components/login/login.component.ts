import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { SwalService } from 'src/app/services/swal.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
maxScore = 3; 
form: FormGroup;
score: number = 0;
loaded: boolean = false;

// FormObject = {
//   usuario : 
// new FormControl('', [Validators.required, Validators.minLength(5)]),
//   password: new FormControl('', Validators.required),
// };

FormObject = {
  usuario: new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]),
  password: new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
  ]),
};

verifyScore(event){
  // const element = this.form.value.password;
  // console.log(element)
  console.log(event.target.value);
}
  
regexp(){
  const score = 0; 
  //regexp1 [\w{8,}] 
  //regexp2 [\d{1}]
  //regexp3 [\W{1,}] 
  // if(regexp1.validate()) {this.score++};
  // if(regexp2.validate()) {this.score++};
}

// getEdit({user,password,nickname}){
//   const obj = {
//     usuario: new FormControl(user),
//     password: new FormControl(password),
//     nickname: new FormControl(nickname)
//   }
//   return obj;
// }

  constructor(private service : LoginService, private swal: SwalService, private router: Router ) { }

  ngOnInit(): void {
    this.form = new FormGroup(this.FormObject);
    this.loaded = !this.loaded;
  }

  verifyField(field : string) : string{
    // verifyField('usuario') -> this.form.controls['usuario']
    const element = this.form.controls[field];
    let message = "";
    element.status === "INVALID" && element.touched ? message = `El campo ${field} es obligatorio`: "";
    return message;
  }

  async login(){
    try{
      // this.swal.normalMessage({html: 'Holis, en la pc'});
    // console.log('%c ohh apretaron login', 'color:purple');
    // console.log(this.form);
    // console.log(this.form.value)//SERVICE => BACKEND
    //envio los datos al servidor this.service.auth(this.form.value)
    const result: any = await this.service.auth(this.form.value);
    // const {JWT, info: {usuario}} = result;
    const {JWT, info} = result;
    // console.log(JWT);
    // console.log(usuario);
    //donde guardamos la info, session o storage
    //ejemplo abajo, creo variables de sesion
    localStorage.setItem('JWT', JWT);
    //localStorage.setItem('user', usuario);
    //ejemplo parse abajo
    localStorage.setItem('user', JSON.stringify(info));
    this.router.navigate(['curso/:id']);
    // console.log(JSON.parse(JSON.stringify(info)));
    }
    catch(e){
      //mensaje-> usuario o passwords incorrectos
    }
  }

}
