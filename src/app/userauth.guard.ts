import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserauthGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      {
        if(sessionStorage.getItem('usertoken') == "User"){
          if (route.data['role'] =='User') { 
            // this.router.navigate[('/Viewevent')];
            return true;  
          }
          else{
            this.router.navigate(['/Userlogin']);
            return false;
          }
        }   
        else{
          this.router.navigate(['/Userlogin']);
          return false;
        }
    }
  }
}
