import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateService } from '../services/create.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-partner',
  templateUrl: './create-partner.component.html',
  styleUrls: ['./create-partner.component.css']
})
export class CreatePartnerComponent implements OnInit  {
  constructor(private service:CreateService, private router:ActivatedRoute) { }

  errormsg:any;
  successmsg:any;
  getParamID:any;

  ngOnInit(): void {
    this.getParamID = this.router.snapshot.paramMap.get('id');
    if(this.getParamID){

      this.service.getSinglePartner(this.getParamID).subscribe((res)=>{
        console.log(res,'res=>');
        this.partnerForm.patchValue({
          name: res.data[0].name,
          zipCode: res.data[0].zipCode,
          city: res.data[0].city,
          address: res.data[0].address,
        });
      });
    }
  }

  partnerForm = new FormGroup({
    'name': new FormControl('',Validators.required),
    'zipCode': new FormControl('',Validators.required),
    'city': new FormControl('',Validators.required),
    'address': new FormControl('', Validators.required)
  });

   //create new partner
   partnerSubmit(){
    if(this.partnerForm.valid){
      console.log(this.partnerForm.value); 
      this.service.createPartner(this.partnerForm.value).subscribe((res)=>{
        console.log(res,'res==>');
        this.partnerForm.reset();
        this.errormsg='';
        this.successmsg = res.message;
      });

    }else {
      this.errormsg = 'Helytelen kitöltés!';
    }
  }
//updatepartner
  partnerUpdate(){
    console.log(this.partnerForm.value,'updatedForm');
    if(this.partnerForm.valid){
      this.service.updatePartner(this.partnerForm.value, this.getParamID).subscribe((res)=>{
        console.log(res,'resupdated');
        this.successmsg=res.message;
        this.errormsg='';
      });
    }else{
}
}
}
