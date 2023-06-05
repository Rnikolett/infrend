import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CreateService } from '../services/create.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit{

  constructor(private service:CreateService,private router:ActivatedRoute) { }
  
  errormsg:any;
  successmsg:any;
  getParamID:any;

  ngOnInit(): void {
    this.getParamID = this.router.snapshot.paramMap.get('id');
    if(this.getParamID){

      this.service.getSingleMachine(this.getParamID).subscribe((res)=>{
        console.log(res,'res=>');
        this.machineUpdateForm.patchValue({
          machineName: res.data[0].machineName,
          acquisition: res.data[0].acquisition,
          manufacturer: res.data[0].manufacturer,
          state: res.data[0].state,
          chassisNumber: res.data[0].chassisNumber
        });
        
      });
    }
    
  }

  machineCreateForm = new FormGroup({
    'machineName': new FormControl('',Validators.required),
    'acquisition': new FormControl('',Validators.required),
    'manufacturer': new FormControl('',Validators.required),

    'chassisNumber': new FormControl('', Validators.required)
  });

  machineUpdateForm = new FormGroup({
    'machineName': new FormControl('',Validators.required),
    'acquisition': new FormControl('',Validators.required),
    'manufacturer': new FormControl('',Validators.required),
    'state': new FormControl('', Validators.required),
    'chassisNumber': new FormControl('', Validators.required)
  });

  machineUpdate(){
    console.log(this.machineUpdateForm.value,'updatedForm');
    if(this.machineUpdateForm.valid){
      this.service.updateMachine(this.machineUpdateForm.value, this.getParamID).subscribe((res)=>{
        console.log(res,'resupdated');
        this.successmsg=res.message;
        this.errormsg='';
      });
    }else{
      this.errormsg='Hibás kitöltés';
    }
  }

  machineSubmit(){
    if(this.machineCreateForm.valid){
      console.log(this.machineCreateForm.value); 
      this.service.createMachine(this.machineCreateForm.value).subscribe((res)=>{
        console.log(res,'res==>');
        this.errormsg='';
        this.successmsg = res.message;
      });

    }else {
      this.errormsg = 'Helytelen kitöltés!';
    }
  }


}
