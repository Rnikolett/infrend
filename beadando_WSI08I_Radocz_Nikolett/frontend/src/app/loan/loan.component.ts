import { Component, OnInit } from '@angular/core';
import { LoanService } from '../services/loan.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {

  constructor(private service:LoanService) { }

  errormsg:any;
  success:any;
  readedDataMachine:any;
  readedDataPartner:any;
  selectedPartnerOption:any;
  printedPartnerOption:any;
  selectedMachineOption:any;
  printedMachineOption:any;
  canLoan:any;

  ngOnInit(): void {
    this.getMachineIdAndName();
    this.getPartnerIdAndName();
  }

  loanSubmit(){
    this.printedPartnerOption = this.selectedPartnerOption;
    this.printedMachineOption = this.selectedMachineOption;
    
    if(this.isLoanOk(this.printedPartnerOption,this.printedMachineOption)){
      this.service.setStateBusy(this.printedMachineOption).subscribe((res)=>{
        console.log(res,'res=>');
        
      });

      this.service.setPartnerIdForMachine(this.printedMachineOption,this.printedPartnerOption).subscribe((res)=>{
        console.log(res,"res==>");
        
      });
      this.success = "Sikeres kölcsönzés"
    }
  }

  getMachineIdAndName(){
    this.service.getMachineIdAndName().subscribe((res)=>{
      console.log(res,"res==>");
      this.readedDataMachine = res.data;
    });
  }

  getPartnerIdAndName(){
    this.service.getPartnerIdAndName().subscribe((res)=>{
      console.log(res,"res==>");
      this.readedDataPartner = res.data;
    });
  }

  isLoanOk(a:any, b:any){
    this.canLoan=false;
    if(isNaN(a)){
      this.errormsg='Választani kell egy ügyfelet!';
    }else if(isNaN(b)){
      this.errormsg='Választani kell egy gépet';
    }else{
      this.canLoan=true;
      this.errormsg='';
    }
    return this.canLoan;
  }

}
