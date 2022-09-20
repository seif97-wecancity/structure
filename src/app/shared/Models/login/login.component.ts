import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,  } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../API-Service/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

changetype:boolean = true;
show:boolean = false;
person:FormGroup ;
  constructor(private _FormBuilder:FormBuilder,private _LoginService:LoginService, private _Router:Router ) { }

  ngOnInit(): void {
    this.initiate();
    
  }


  initiate(){
    this.person = this._FormBuilder.group({
      "userName": ['', Validators.required],
      "password": ['', Validators.required],
    });
  }
  // loopform() {
  //   this.data = new FormData();
  //   this.data.append("userName", this.person.value.user_name);
  //   this.data.append("password", this.person.value.passowrd);
    
  // }
 showPassword(){
  this.show = !this.show;
  this.changetype = !this.changetype;
  }

  onSubmit(){
    
    this._LoginService.user_login(this.person.value).subscribe((res) => {
      debugger
          console.log(res);
          Swal.fire({
            icon: "success",
            title: "Signed in successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          localStorage.setItem('Authorization',res.data["token"]);
          this._Router.navigate(["/content/admin"]);
    },(err) =>{
    console.log("their is an error");
    Swal.fire({
      icon: 'error',
      title: 'failed to sign in',
      text:err.error.message    
    })
    }, () =>{
      console.log("completed");
      
    });
  }
}
