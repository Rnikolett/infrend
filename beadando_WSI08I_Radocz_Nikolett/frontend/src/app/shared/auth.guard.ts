import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth : AuthService, private router : Router){

  }
  canActivate(){
    if( this.auth.IsLoggedIn()){
      console.log(localStorage.getItem('userType'));
     return true;
    }
    alert('Kérlek jelentkezz be!')
    this.router.navigate(['login']);
    return false;
  }
  
}
