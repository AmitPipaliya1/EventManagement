import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
    {
      if(sessionStorage.getItem('authtoken') == "Admin"){
        if (route.data['role'] =="Admin" ) { 
          return true;  
        }
        else{
          this.router.navigate(['/Adminlogin']);
          return false;
        }
      } 
      else{
        this.router.navigate(['/Adminlogin']);
        return false;
      }  
  }
}
