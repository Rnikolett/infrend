import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit{

  constructor(private service:ApiserviceService) { }

  errormsg:any;
  success:any;

  ngOnInit(): void {
  }

  newUserForm = new FormGroup({
    'username': new FormControl('',Validators.required),
    'password': new FormControl('',Validators.required),
  })

  userSubmit(){
    if(this.newUserForm.valid){
      this.service.createUser(this.newUserForm.value).subscribe((res)=>{
        this.newUserForm.reset();
        this.errormsg='';
        this.success = 'Sikeres felvitel';
      })
      
    }else {
      this.errormsg = 'Helytelen kitöltés!';
    }
  }
}
