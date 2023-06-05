import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RoleGuard } from '../shared/role.guard';
import { ReadService } from '../services/read.service';



@Component({
  selector: 'app-read-partner',
  templateUrl: './read-partner.component.html',
  styleUrls: ['./read-partner.component.css']
})
export class ReadPartnerComponent implements OnInit{

  constructor(private service:ReadService, private router:ActivatedRoute, private role:RoleGuard) { }

  readedData:any;
  successmsg:any;
  getParamName:any;
  permission = false;

  ngOnInit(): void {
    this.permission = this.role.canActivateInit();
    this.getAllPatners();
  }

  searchByNameForm = new FormGroup({
    'searchbyName': new FormControl('',Validators.required),
  });

  searchByIdForm = new FormGroup({
    'searchbyId': new FormControl('',Validators.required),
  });

  searchByName(){
    if(this.searchByNameForm.valid){
      this.service.searchPartnerByName(this.searchByNameForm.get('searchbyName')?.value).subscribe((res)=>{
        this.readedData = res.data;
        
      });
    }
    
  }
  searchById(){
    if(this.searchByIdForm.valid){
      this.service.searchPartnerById(this.searchByIdForm.get('searchbyId')?.value).subscribe((res)=>{
        this.readedData = res.data;
        
      });
    }
    
  }
  deleteID(id:any){
    console.log(id, 'deleteId==>');
    this.service.deletePartner(id).subscribe((res)=>{
        console.log(res,'deleteres==>');
        this.successmsg=res.message;
        
       this.getAllPatners();
    });
    
  }
  getAllPatners(){
    this.service.getAllPartner().subscribe((res)=>{
      console.log(res,"res==>");
      this.readedData = res.data;
    });
  }


}
