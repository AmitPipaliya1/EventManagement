import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/Services/api-call.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  loginForm!: any;
  user!: any;
  EndPoint!: any;
  registerSucess: boolean = false;
  message = '';
  IsSubmitted = false
  constructor(private form: FormBuilder, private router: Router, private service: ApiCallService) { }

  ngOnInit(): void {
    sessionStorage.clear();
    this.loginForm = this.form.group({
      EmailId: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      Password: ['', [Validators.required, Validators.minLength(8)]],
      FLAG: ['UserLogin']
    });
  }

  openRegisterPage(){
    this.router.navigate(['/Userregistration'])
  }
  onSubmit(form: FormGroup) {
    this.IsSubmitted = true
    if (this.loginForm.valid) {
      this.user = this.loginForm.value;
      console.log(this.user)
      //This API Call For Login User User  
      this.EndPoint = "api/User/CreateUser";
      this.service.ApiCall(this.EndPoint, this.user).subscribe((response: any) => {
        console.log(response.Message);
        this.message = response.Message;
        this.registerSucess = true;
        if (this.message == "LOGIN SUCCESSFULLY") {
          alert(this.message);
          this.loginForm.reset();
          sessionStorage.setItem('usertoken', 'User');
          this.router.navigate(['/usersidebar']);
        }
        else {
          alert(this.message);
        }
      });
    }
  }
}
