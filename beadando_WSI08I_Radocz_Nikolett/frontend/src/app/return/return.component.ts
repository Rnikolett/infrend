import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css']
})
export class ReturnComponent implements OnInit {

  constructor(private service:ApiserviceService) { }

  numberOfMachines:any;
  success:any;
  errormsg:any;
  selectedPartnerOption:any;
  printedPartnerOption:any;
  readedDataPartner:any;
  canReturn:any;
  checkbox = false;
  sumToPay:any;
  days=1;

  ngOnInit(): void {
    this.getPartnerIdAndName();
  }

  calculatePrice(){
    this.printedPartnerOption = this.selectedPartnerOption;

    if(this.isValueOk(this.printedPartnerOption)){
      this.service.numberOfMachines(this.printedPartnerOption).subscribe((res)=>{
        this.numberOfMachines=res.data[0].numberOfMachines;

        if(this.numberOfMachines==0){
          this.errormsg = 'Ez az ügyfél nem bérel gépet!';
          this.sumToPay='';
        }else{
          this.sumToPay = this.numberOfMachines*7500*this.days;
          if(this.checkbox==true){
            this.sumToPay += 20000;
          }
        }

      });
    }
  }

  machineReturned(){
    this.printedPartnerOption = this.selectedPartnerOption;

    if(this.isValueOk(this.printedPartnerOption)){
      this.service.setPartnerIdToDefault(this.printedPartnerOption).subscribe((res)=>{
        this.success = "Fizetés sikeresen rendezve!"
      });
    }
  }

  isValueOk(a:any){
    this.canReturn=false;
    if(isNaN(a)){
      this.errormsg='Választani kell egy ügyfelet!';
    }else{
      this.canReturn=true;
      this.errormsg='';
    }
    return this.canReturn;
  }

  getPartnerIdAndName(){
    this.service.getPartnerIdAndName().subscribe((res)=>{
      console.log(res,"res==>");
      this.readedDataPartner = res.data;
    });
  }
}
