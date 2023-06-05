import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReadService {

  constructor(private http:HttpClient) { }

    apiUrl = 'http://localhost:3000/partner';
    searchByMachineNameUrl = 'http://localhost:3000/searchMachineByName';
    machineUrl = 'http://localhost:3000/machine';
    searchByMachineIdUrl = 'http://localhost:3000/searchMachineById';
    searchByNameUrl = 'http://localhost:3000/searchPartnerByName';
    searchByIdUrl = 'http://localhost:3000/searchPartnerById';


    //search machine by name
    searchMachineByName(name:any):Observable<any>{
      let nameVar = name;
      return this.http.get(`${this.searchByMachineNameUrl}/${nameVar}`);
    }

    //search machine by id
  searchMachineById(id:any):Observable<any>{
    let ids = id;
    return this.http.get(`${this.searchByMachineIdUrl}/${ids}`);
  }

  getAllMachine():Observable<any>{
    return this.http.get(`${this.machineUrl}`);
  }

  deleteMachine(id:any):Observable<any>{
    let ids = id;
    return this.http.delete(`${this.machineUrl}/${ids}`);
  }

  getAllPartner():Observable<any>{
    return this.http.get(`${this.apiUrl}`);
  }

  deletePartner(id:any):Observable<any>{
    let ids = id;
    return this.http.delete(`${this.apiUrl}/${ids}`);
  }

  searchPartnerByName(name:any):Observable<any>{
    let nameVar = name;
    return this.http.get(`${this.searchByNameUrl}/${nameVar}`);
  }

  searchPartnerById(id:any):Observable<any>{
    let ids = id;
    return this.http.get(`${this.searchByIdUrl}/${ids}`);
  }
}
