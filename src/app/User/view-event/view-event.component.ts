import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/Services/api-call.service';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent {
  AddActivity!: any;
  EndPoint!: any;
  registerSucess: boolean = false;
  Noevent = false
  message = '';
  EventList!: any;
  flag :boolean = false;
  flag2:boolean = true;
  ShowEvent:any
  constructor(private form: FormBuilder, private router: Router, private service: ApiCallService) { }
  
  ngOnInit(): void {
    console.log("in view event");
    this.flag = false ;

    // Logic For Ongoing And Upcoming Event
    if (this.service.vieweventflag == "UpcomingEvent" ) {
      this.ShowEvent =
      {
        "FLAG": 'ShowUpcomingEvent'
      }
    }
    else if(this.service.vieweventflag == "OngoingEvent"){
      this.ShowEvent = {
        "FLAG": 'ShowOngoingEvent'
      }
    }
    else{
      this.ShowEvent = {
        "FLAG": 'ShowPublishEvent'
      }
    }

    //This API Call For Show All Event
    this.EndPoint = "api/Event/AddEvent";
    this.service.ApiCall(this.EndPoint, this.ShowEvent).subscribe((response: any) => {
      // console.log(response.ArrayOfResponse);
      this.message = response.Message;
      this.EventList = response.ArrayOfResponse;
      console.log(this.EventList.length)
      console.log(this.EventList)
      if(this.EventList.length > 0)
        {
          this.flag = true ;
        }
    });
  }

  //This Method Use For Navigate to Viewactivity Page 
  Seemore(index: any) {
    this.router.navigate(['/Viewactivity']);
    this.service.id = this.EventList[index].EventId;
    this.service.image = "data:image/jpeg;base64," + this.EventList[index].Image;
    console.log(this.service.id);
    console.log(this.service.image);
  }
}
