import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private service:ApiserviceService,private router: Router) { }
  errormsg:any;

  ngOnInit(): void {
    localStorage.setItem('token', '');
  }

  //check login
  loginForm = new FormGroup({
    'username': new FormControl('',Validators.required),
    'password': new FormControl('',Validators.required)
  });

  loginSubmit(){

    if(this.loginForm.valid){
      this.service.getLoginData(this.loginForm.value).subscribe((res)=>{
        if(res.data[0].numberOfUsers==1){
          this.router.navigate(["/read"]);
          localStorage.setItem('token', 'abc123');
          this.loginForm.value.username == "niki" ? localStorage.setItem('userType','admin') : localStorage.setItem('userType', 'user');
        }
        else{
          this.errormsg='Hibás a felhasználónév vagy a jelszó'
        }
        this.loginForm.reset();
      });
    }
  }
}
