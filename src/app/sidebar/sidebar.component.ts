import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  btn1flag!: boolean;
  btn2flag!: boolean;
  btn3flag!: boolean;
  btn4flag!: boolean;
  homeflag!: boolean;

  constructor(private router: Router) {
  }
  Logout() {
    sessionStorage.clear();
    this.router.navigate(['/Home']);
  }

  Home() {
    this.homeflag = true;
    this.btn1flag = false;
    this.btn2flag = false;
    this.btn3flag = false;
    this.btn4flag = false;
  }
  btn1() {
    this.homeflag = false;
    this.btn1flag = true;
    this.btn2flag = false;
    this.btn3flag = false;
    this.btn4flag = false;
  }
  btn2() {
    this.homeflag = false;
    this.btn1flag = false;
    this.btn2flag = true;
    this.btn3flag = false;
    this.btn4flag = false;
  }
  btn3() {
    this.homeflag = false;
    this.btn1flag = false;
    this.btn2flag = false;
    this.btn3flag = true;
    this.btn4flag = false;
  }
  btn4() {
    this.homeflag = false;
    this.btn1flag = false;
    this.btn2flag = false;
    this.btn3flag = false;
    this.btn4flag = true;
  }
}
