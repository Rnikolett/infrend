import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http:HttpClient) { }

  logingUrl ='http://localhost:3000/logging';
  insertNewUser = 'http://localhost:3000/insertNewUser';
  getPartnerIdAndNameUrl = 'http://localhost:3000/getPartnerIdAndName';
  setPartnerIdToDefaultUrl = 'http://localhost:3000/setPartnerIdToDefault';
  numberOfMachinesUrl = 'http://localhost:3000/numberOfMachines';
  
  //insert new user
  createUser(data:any):Observable<any>{
    return this.http.post(`${this.insertNewUser}`,data)
  }

  //getLoginData
  getLoginData(data:any):Observable<any>{
    console.log(data, 'logging==>');
    
    return this.http.post(`${this.logingUrl}`,data);
  }

  numberOfMachines(partnerId:any):Observable<any>{
    return this.http.get(`${this.numberOfMachinesUrl}/${partnerId}`);
  }

  setPartnerIdToDefault(partnerId:any):Observable<any>{
    var jsonObject = {"partnerId":partnerId};
    return this.http.put(`${this.setPartnerIdToDefaultUrl}`,jsonObject);
  }

  getPartnerIdAndName():Observable<any>{
    return this.http.get(`${this.getPartnerIdAndNameUrl}`);
  }

}

