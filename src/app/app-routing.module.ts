import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './Admin/admin-login/admin-login.component';
import { UserLoginComponent } from './User/user-login/user-login.component';
import { UserRegistrationComponent } from './User/user-registration/user-registration.component';
import { AddEventComponent } from './add-event/add-event.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { AddPriceComponent } from './add-price/add-price.component';
import { EventPublishComponent } from './event-publish/event-publish.component';
import { ViewEventComponent } from './User/view-event/view-event.component';
import { ViewActivityComponent } from './User/view-activity/view-activity.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthenticationGuard } from './authentication.guard';
import { UserauthGuard } from './userauth.guard';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  { path: 'Adminlogin', component: AdminLoginComponent },
  { path: 'Userlogin', component: UserLoginComponent },
  { path: 'Userregistration', component: UserRegistrationComponent },
  { path: 'Addevent', component: AddEventComponent, canActivate:[AuthenticationGuard] ,data: {role: 'Admin'}},
  { path: 'Addactivity', component: AddActivityComponent,canActivate:[AuthenticationGuard] ,data: {role: 'Admin'} },
  { path: 'Addprice', component: AddPriceComponent,canActivate:[AuthenticationGuard] ,data: {role: 'Admin'} },
  { path: 'Publish', component: EventPublishComponent,canActivate:[AuthenticationGuard]  ,data: {role: 'Admin'}},
  { path: 'Viewevent', component: ViewEventComponent,canActivate:[UserauthGuard], data: {role: 'User'} },
  { path: 'Viewactivity', component: ViewActivityComponent,canActivate:[UserauthGuard], data: {role: 'User'}},
  { path: 'sidebar', component: SidebarComponent,canActivate:[AuthenticationGuard]  ,data: {role: 'Admin'}} , 
  { path: 'Home', component: NavbarComponent},
  { path: "**", component: NavbarComponent}                                         
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
