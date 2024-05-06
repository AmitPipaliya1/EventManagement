import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/Services/api-call.service';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  loginForm!: any;
  user!: any;
  EndPoint!: any;
  registerSucess: boolean = false;
  message = '';
  imagestring!: any;
  IsSubmited = false;
  constructor(private form: FormBuilder, private router: Router, private service: ApiCallService) { }

  ngOnInit(): void {
    sessionStorage.clear();
    this.loginForm = this.form.group({
      EmailId: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      Password: ['', [Validators.required, Validators.minLength(8)]],
      FLAG: ['AdminLogin']
    });
  }


  onSubmit(form: FormGroup) {
    this.IsSubmited = true
    {
      if (this.loginForm.valid) {
        this.user = this.loginForm.value;
        console.log(this.user)
        
        //This API Call For Admin Login 
        this.EndPoint = "api/Admin/AdminLogin";
        this.service.ApiCall(this.EndPoint, this.user).subscribe((response: any) => {
          console.log(response.Message);
          this.message = (response.Message);
          console.log(this.message)
          this.registerSucess = true;
          if (this.message == "LOGIN SUCCESSFULLY") {
            setTimeout(() => {
              this.registerSucess = false
            }, 3000);
            this.IsSubmited = false
            this.loginForm.reset();
            sessionStorage.setItem('authtoken', 'Admin');
            alert(this.message)
            this.router.navigate(['/sidebar']);
          }
        });
      }
    }
  }
}