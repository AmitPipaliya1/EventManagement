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
  message = '';
  EventList!: any;
  constructor(private form: FormBuilder, private router: Router, private service: ApiCallService) { }

  ngOnInit(): void {
    console.log("in view event");
    let ShowEvent =
    {
      "FLAG": 'ShowPublishEvent'
    }

    //This API Call For Show All Event
    this.EndPoint = "api/Event/AddEvent";
    this.service.ApiCall(this.EndPoint, ShowEvent).subscribe((response: any) => {
      console.log(response.ArrayOfResponse);
      this.message = (response.Message);
      this.EventList = response.ArrayOfResponse;
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
