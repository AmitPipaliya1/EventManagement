import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallService } from '../Services/api-call.service';

@Component({
  selector: 'app-add-price',
  templateUrl: './add-price.component.html',
  styleUrls: ['./add-price.component.css']
})
export class AddPriceComponent {
  AddPrice!: any;
  user!: any;
  EndPoint!: any;
  registerSucess: boolean = false;
  message = '';
  ActivityList!: any;
  Noactivity = false;
  actvitiymsg: string;
  Noevent!:boolean
  eventmsg: string;
  EventList!:any;
  IsSubmited = false;
  constructor(private form: FormBuilder, private router: Router, private service: ApiCallService) { }

  ngOnInit(): void {
    this.AddPrice = this.form.group({
      EventName: ['', [Validators.required]],
      ActivityName: ['', [Validators.required]],
      Price: ['', Validators.required],
      FLAG: ['AddPrice'],
    });


    let ShowEvent =
    {
      "FLAG": 'ShowEvent'
    }

    // This Api Call For Show Event
    this.EndPoint = "api/Event/AddEvent";
    this.service.ApiCall(this.EndPoint, ShowEvent).subscribe((response: any) => {
      console.log(response.Message);
      this.eventmsg = response.Message;
      this.EventList = response.ArrayOfResponse;
      if (this.eventmsg == "No Data Found") {
        this.eventmsg = "THERE IS NO EVENT"
        this.Noevent = true;
        console.log(this.eventmsg);
      }
      //console.log("data of response",this.EventList);
    });


  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  SelectActivity() {
    //debugger
    let ShowActivity =
    {
      "EventId": this.AddPrice.controls["EventName"].value,
      "FLAG": 'ShowActivity'
    }
    // This Api Call For Show Activity
    console.log(ShowActivity);
    this.EndPoint = "api/Activity/AddActivity";
    this.service.ApiCall(this.EndPoint, ShowActivity).subscribe((response: any) => {
      console.log(response.Message);
      this.actvitiymsg = (response.Message);
      this.ActivityList = response.ArrayOfResponse;
      if (this.actvitiymsg == "No Data Found") {
        debugger
        this.actvitiymsg = "THERE IS NO ACTIVITY"
        this.Noactivity = true;
        console.log(this.ActivityList);
        console.log(this.actvitiymsg);
      }
      else{
        this.Noactivity = false;
      }
    });
  }

  onSubmit(form: FormGroup) {
    this.IsSubmited = true
    if (this.AddPrice.valid) {
      let Request =
      {
        "ActivityId": this.AddPrice.controls["ActivityName"].value,
        "Price": this.AddPrice.controls["Price"].value,
        "FLAG": this.AddPrice.controls["FLAG"].value
      }

      // This Api Call For Add Price In Activity
      console.log(Request);
      this.EndPoint = "api/Activity/AddActivity";
      this.service.ApiCall(this.EndPoint, Request).subscribe((response: any) => {
        this.message = (response.Message);
        this.registerSucess = true;
        alert(this.message);
        if (this.message = "PRICE ADDED") {
          setTimeout(() => {
            this.registerSucess =false
          }, 2000);
          this.IsSubmited = false
          this.AddPrice.reset();
          // this.router.navigate(['/Publish']);
        }
      });
    }
  }
}
