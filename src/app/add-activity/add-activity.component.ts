import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallService } from '../Services/api-call.service';
import { AddEventComponent } from '../add-event/add-event.component';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})  
export class AddActivityComponent {
  AddActivity!: any;
  Submitflag = false;
  EndPoint!: any;
  Noevent = false;
  eventmsg:string;
  message = '';
  registerSucess = false
  mindate!: any;
  maxdate!: any;
  EventList!: any;
  currentDate: string;
  constructor(private form: FormBuilder, private router: Router, private service: ApiCallService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.AddActivity = this.form.group({
      EventName: ['', [Validators.required]],
      ActivityName: ['', [Validators.required]],
      Discription: ['', Validators.required],
      Startdate: ['', Validators.required],
      Enddate: ['', Validators.required],
      FLAG: ['AddActivity'],
    });
  
    let ShowEvent =
    {
      "FLAG": 'ShowEvent'
    }

    // This API call For Show Avilable Event
    this.EndPoint = "api/Event/AddEvent";
    this.service.ApiCall(this.EndPoint, ShowEvent).subscribe((response: any) => {
      this.eventmsg = response.Message;
      this.EventList = response.ArrayOfResponse;
      console.log("data of response", response.Message)
      if(this.eventmsg == "No Data Found" ){
           this.eventmsg = "THERE IS NO EVENT"
           this.Noevent =true ;
           console.log(this.eventmsg);
      }
    });
  }


  // This Method Use For Find Start Date
  SelectStartDate() {
    this.mindate = this.AddActivity.controls["Startdate"].value
  }

   // This Method Use For Find Current Date AND Find Start date Of Event AND End Date of Event
  SelectDate() {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    console.log(this.currentDate);
    console.log(this.AddActivity.controls["EventName"].value);
    this.EventList.forEach((e: any) => {
      if (e.EventId == this.AddActivity.controls["EventName"].value) {
        this.mindate = e.StartDate.substring(0, 10).split("-").reverse().join("-") + "T00:00";
        console.log(this.mindate);
        this.maxdate = e.EndDate.substring(0, 10).split("-").reverse().join("-") + "T00:00";
        console.log(this.maxdate);
      }
    });
  }

  onSubmit(form: FormGroup) {
    debugger
    this.Submitflag = true;
    if (this.AddActivity.valid) {
      let Request =
      {
        "EventId": this.AddActivity.controls["EventName"].value,
        "ActivityName": this.AddActivity.controls["ActivityName"].value,
        "Discription": this.AddActivity.controls["Discription"].value,
        "StartDate": this.AddActivity.controls["Startdate"].value,
        "EndDate": this.AddActivity.controls["Enddate"].value,
        "FLAG": this.AddActivity.controls["FLAG"].value
      }
      // This API call For Add New Activity
      this.EndPoint = "api/Activity/AddActivity";
      this.service.ApiCall(this.EndPoint, Request).subscribe((response: any) => {
        console.log(response.Message);
        this.message = (response.Message);
        this.registerSucess = true;
        alert(this.message);
        if(this.message = "Activity Added Successfully"){
          this.Submitflag =false;
          this.AddActivity.reset();
          // this.router.navigate(['/Addprice']);
        }
      });
    }
  }
}
