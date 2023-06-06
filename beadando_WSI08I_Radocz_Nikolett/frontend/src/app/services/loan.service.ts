import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http:HttpClient) { }

  setStateBusyUrl = 'http://localhost:3000/setStateBusy';
  getMachineIdAndNameUrl = 'http://localhost:3000/getMachineIdAndName';
  getPartnerIdAndNameUrl = 'http://localhost:3000/getPartnerIdAndName';
  setPartnerIdForMachineUrl = 'http://localhost:3000/setPartnerIdForMachine';
  loanMachineUrl = 'http://localhost:3000/loanMachine';
  getPartnerBallanceUrl = 'http://localhost:3000/getPartnerBallance';


  setStateBusy(id:any):Observable<any>{

    var jsonObject = {"id":id};
    
    return this.http.put(`${this.setStateBusyUrl}`,jsonObject);
  }

  setPartnerIdForMachine(machineId:any,partnerId:any):Observable<any>{

    var jsonObject = {"machineId":machineId, "partnerId":partnerId};
    
    return this.http.put(`${this.setPartnerIdForMachineUrl}`,jsonObject);
  }

  getMachineIdAndName():Observable<any>{
    return this.http.get(`${this.getMachineIdAndNameUrl}`);
  }

  getPartnerIdAndName():Observable<any>{
    return this.http.get(`${this.getPartnerIdAndNameUrl}`);
  }

  loanMachine(data:any):Observable<any>{
    return this.http.post(`${this.loanMachineUrl}`,data);
  }
  getPartnerBallance():Observable<any>{
    return this.http.get(`${this.getPartnerBallanceUrl}`);
  }
}
