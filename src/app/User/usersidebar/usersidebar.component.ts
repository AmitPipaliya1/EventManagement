import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/Services/api-call.service';

@Component({
  selector: 'app-usersidebar',
  templateUrl: './usersidebar.component.html',
  styleUrls: ['./usersidebar.component.css']
})
export class UsersidebarComponent {
  btn1flag:boolean =false;
  btn2flag:boolean =false;
  btn3flag:boolean =false;
  constructor(private router:Router,private service:ApiCallService){
  }
  Logout(){
    sessionStorage.clear();
    this.router.navigate(['/Home']);
  }
  btn1(){
    this.btn1flag =true;
    this.btn2flag =false;
    this.btn3flag =false;
    this.service.vieweventflag = "OngoingEvent"
  }
  btn2(){
    this.btn1flag =false; 
    this.btn2flag =true;
    this.btn3flag =false;
    this.service.vieweventflag = "UpcomingEvent"
  }
  btn3(){
    this.btn1flag =false;
    this.btn2flag =false;
    this.btn3flag =true;
    this.service.vieweventflag = "AllEvent"
  }
}
