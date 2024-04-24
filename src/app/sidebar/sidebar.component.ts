import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  btn1flag!:boolean;
  btn2flag!:boolean;
  btn3flag!:boolean;
  btn4flag!:boolean;


  constructor(private router:Router){
  }
  Logout(){
    this.router.navigate(['/Home']);
  }
  btn1(){
    this.btn1flag =true;
    this.btn2flag =false;
    this.btn3flag=false;
    this.btn4flag=false;
  }
  btn2(){
    this.btn1flag =false;
    this.btn2flag =true;
    this.btn3flag=false;
    this.btn4flag=false;
  }
  btn3(){
    this.btn1flag =false;
    this.btn2flag =false;
    this.btn3flag=true;
    this.btn4flag=false;
  }
  btn4(){
    this.btn1flag =false;
    this.btn2flag =false;
    this.btn3flag=false;
    this.btn4flag=true;
  }
}
