import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  constructor(private http:HttpClient) { }

  machineUrl = 'http://localhost:3000/machine';
  apiUrl = 'http://localhost:3000/partner';

  getSingleMachine(id:any):Observable<any>{
    let ids = id;
    return this.http.get(`${this.machineUrl}/${ids}`);
  }

  updateMachine(data:any,id:any):Observable<any>{
    let ids = id;
    return this.http.put(`${this.machineUrl}/${ids}`,data);
  }

  createMachine(data:any):Observable<any>{
    return this.http.post(`${this.machineUrl}`,data);
  }
  getSinglePartner(id:any):Observable<any>{
    let ids = id;
    return this.http.get(`${this.apiUrl}/${ids}`);
  }

  createPartner(data:any):Observable<any>{
    console.log(data,'createApi==>');
    
    return this.http.post(`${this.apiUrl}`,data);
  }
  updatePartner(data:any,id:any):Observable<any>{
    let ids = id;
    return this.http.put(`${this.apiUrl}/${ids}`,data);
  }
}
