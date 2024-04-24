import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/Services/api-call.service';

@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.component.html',
  styleUrls: ['./view-activity.component.css']
})
export class ViewActivityComponent {
  AddActivity!: any;
  EndPoint!: any;
  registerSucess: boolean = false;
  message = '';
  ActivityList!: any;
  EventList!: any;
  constructor(private form: FormBuilder, private router: Router, private service: ApiCallService) { }
  eventid: string
  eventimage: string
  ngOnInit(): void {
    this.eventid = this.service.id;
    this.eventimage = this.service.image


    let ViewActivity =
    {
      "FLAG": 'ShowActivity',
      "EventId": this.eventid
    }

    //This API Call For Show All Activity
    this.EndPoint = "api/Activity/AddActivity";
    this.service.ApiCall(this.EndPoint, ViewActivity).subscribe((response: any) => {
      console.log(response.Message);
      this.message = (response.Message);
      this.ActivityList = response.ArrayOfResponse;
      console.log(this.ActivityList);
    });


    let ShowEvent =
    {
      "FLAG": 'ShowEvent'
    }

    //This API Call For Show All Event  
    this.EndPoint = "api/Event/AddEvent";
    this.service.ApiCall(this.EndPoint, ShowEvent).subscribe((response: any) => {
      console.log(response.Message);
      this.message = (response.Message);
      this.EventList = response.ArrayOfResponse;
      console.log(this.EventList.Image);
    });
  }
}
