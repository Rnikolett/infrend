import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  canActivate(){
    let Role = localStorage.getItem('userType');
    if(Role == "admin"){
      return true;
    }
    alert("Nem rendelkezel adminisztrátori jogosultsággal!");
    return false;
  }

  canActivateInit(){
    let Role = localStorage.getItem('userType');
    if(Role == "admin"){
      return true;
    }
    return false;
  }
  
}
