import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallService } from '../Services/api-call.service';
import { EventModel } from '../Model/EventModel';
import { DatePipe } from '@angular/common';
DatePipe

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {
  AddEvent!: any;
  EndPoint!: any;
  registerSucess: boolean = false;
  message = '';
  imgstring!: string;
  a!: any;
  mindate!: any
  currentDate!: string
  submitflag = false;
  constructor(private form: FormBuilder, private router: Router, private service: ApiCallService, private datePipe: DatePipe) { 
  }

  ngOnInit(): void {
    console.log("i am in add event")
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.AddEvent = this.form.group({
      EventName: ['', [Validators.required]],
      Discription: ['', [Validators.required]],
      Startdate: ['', Validators.required],
      Enddate: ['', Validators.required],
      Image: ['', [Validators.required]],
      FLAG: ['AddEvent'],
    });
  }

  // This Method Use For Find Start Date
  SelectStartDate() {
    this.mindate = this.AddEvent.controls["Startdate"].value
    console.log(this.mindate);
  }


  // This Method For Convert Image Into Base64string
  onFileChange(event: any) {
    if (event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'image/png') {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        this.imgstring = base64String;
        console.log(base64String);
        this.AddEvent.controls['Image'].setValue(base64String);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    }
    else {
      this.AddEvent.get('Image')?.setErrors({ amit: true });
      alert("Please Select Valid Format");
      event.target.value = null;
    }
  }

  onSubmit(form: FormGroup) {
    debugger
    this.submitflag = true;
    if (this.AddEvent.valid) {
      let Request =
      {
        "EventName": this.AddEvent.controls["EventName"].value,
        "Discription": this.AddEvent.controls["Discription"].value,
        "StartDate": this.AddEvent.controls["Startdate"].value,
        "EndDate": this.AddEvent.controls["Enddate"].value,
        "Image": this.imgstring,
        "FLAG": "AddEvent"
      }

      // This Api Call For Add New Event
      this.EndPoint = "api/Event/AddEvent";
      console.log("this is test ",Request)
      this.service.ApiCall(this.EndPoint, Request).subscribe((response: any) => {
        console.log(response.Message);
        this.message = (response.Message);
        this.registerSucess = true;
        if(this.message = "Event Added Successfully"){
          setTimeout(() => {
            this.registerSucess =false;
          }, 2000);
          alert(this.message);
          this.submitflag =false
          this.AddEvent.reset();
          // this.router.navigate(['/Addactivity']);
        }
      });
    }
  }
}
