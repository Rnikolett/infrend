import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoleGuard } from '../shared/role.guard';
import { ReadService } from '../services/read.service';



@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit{

  constructor(private service:ReadService, private role:RoleGuard) { }

  readedData:any;
  successmsg:any;
  permission=false;

  ngOnInit(): void {
    this.getAllMachines();
    this.permission=this.role.canActivateInit()
  }

  searchByNameForm = new FormGroup({
    'searchbyName': new FormControl('',Validators.required),
  });

  searchByIdForm = new FormGroup({
    'searchbyId': new FormControl('',Validators.required),
  });

  searchByName(){
    if(this.searchByNameForm.valid){
      this.service.searchMachineByName(this.searchByNameForm.get('searchbyName')?.value).subscribe((res)=>{
        this.readedData = res.data;
        
      });
    }
    
  }

  searchById(){
    if(this.searchByIdForm.valid){
      this.service.searchMachineById(this.searchByIdForm.get('searchbyId')?.value).subscribe((res)=>{
        this.readedData = res.data;
        
      });
    }
    
  }

  deleteID(id:any){
    console.log(id, 'deleteId==>');
    this.service.deleteMachine(id).subscribe((res)=>{
        console.log(res,'deleteres==>');
        this.successmsg=res.message;
        
       this.getAllMachines();
    });
    
  }

  getAllMachines(){
    this.service.getAllMachine().subscribe((res)=>{
      console.log(res,"res==>");
      this.readedData = res.data;
    });
  }
  
}
