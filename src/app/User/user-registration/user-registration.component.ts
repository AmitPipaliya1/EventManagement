import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/Services/api-call.service';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  registerSucess: boolean = false;
  IsSubmitted = false;
  message = '';
  EndPoint!: any;
  registrationForm!: FormGroup | any;
  user!: any;
  pattern!: any;
  constructor(private form: FormBuilder, private router: Router, private service: ApiCallService) { }

  ngOnInit() {
    this.registrationForm = this.form.group({
      Name: ['', [Validators.required,Validators.pattern("^[a-zA-Z0-9]*[a-zA-Z]+[a-zA-Z0-9]*$")]],
      EmailId: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      Password: ['', [Validators.required, Validators.minLength(8)]],
      MobileNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      Address: ['', Validators.required],
      FLAG: ['UserRegister']
    });
  }

  omit_special_char(event)
  {   
     var k;  
     k = event.charCode;  //         k = event.keyCode;  (Both can be used)
     return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
  }
  
  openLoginPage(){
    this.router.navigate(['/Userlogin'])
  }
  onSubmit(form: FormGroup) {
    this.IsSubmitted =true;
    if (this.registrationForm.valid) {
      this.user = this.registrationForm.value;

      //This API Call For Create New User
      this.EndPoint = "api/User/CreateUser";
      this.service.ApiCall(this.EndPoint, this.user).subscribe((response: any) => {
        this.message = (response.Message);
        this.registerSucess = true;
        if(this.message=="USER CREATED SUCCESSFULLY"){
          this.router.navigate(['/Userlogin']);
        }
        else{
          // alert("")
        }
      });
    }
  }
}
