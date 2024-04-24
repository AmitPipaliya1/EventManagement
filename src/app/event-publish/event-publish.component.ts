import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallService } from '../Services/api-call.service';

@Component({
  selector: 'app-event-publish',
  templateUrl: './event-publish.component.html',
  styleUrls: ['./event-publish.component.css']
})
export class EventPublishComponent {
  Publish!: any;    
  EndPoint!: any;
  registerSucess: boolean = false;
  message = '';
  EventList!: any;
  Noevent = false;
  eventmsg: string;
  IsSubmited = false
  constructor(private form: FormBuilder, private router: Router, private service: ApiCallService) { }

  ngOnInit(): void {
    this.Publish = this.form.group({
      EventName: ['', [Validators.required]],
      FLAG: ['PublishEvent'],
    });

    let ShowEvent =
    {
      "FLAG": 'ShowEvent'
    }

    // This Api Call For Show Event
    this.EndPoint = "api/Event/AddEvent";
    this.service.ApiCall(this.EndPoint, ShowEvent).subscribe((response: any) => {
      console.log(response.Message);
      this.eventmsg = (response.Message);
      this.EventList = response.ArrayOfResponse;
      console.log("data of response", this.EventList);
      if (this.eventmsg == "No Data Found") {
        this.eventmsg = "THERE IS NO EVENT"
        this.Noevent = true;
        console.log(this.eventmsg);
      }
    });
  }
  onSubmit(form: FormGroup) {
    this.IsSubmited =true
    if (this.Publish.valid) {
      let Request =
      {
        "EventId": this.Publish.controls["EventName"].value,
        "FLAG": this.Publish.controls["FLAG"].value
      }
      // This Api Call For Publish Event
      this.EndPoint = "api/Event/AddEvent";
      this.service.ApiCall(this.EndPoint, Request).subscribe((response: any) => {
        console.log(response.Message);
        this.message = (response.Message);
        this.registerSucess = true;
        if(this.message = "Event Publish SuccessFully"){
          alert(this.message);
          this.IsSubmited = false
          this.ngOnInit();
        }
      });
    }
  }
}
