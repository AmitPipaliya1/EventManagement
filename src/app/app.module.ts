import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './Admin/admin-login/admin-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from './User/user-login/user-login.component';
import { UserRegistrationComponent } from './User/user-registration/user-registration.component';
import { HttpClientModule } from '@angular/common/http';
import { AddEventComponent } from './add-event/add-event.component';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { AddPriceComponent } from './add-price/add-price.component';
import { EventPublishComponent } from './event-publish/event-publish.component';
import { ViewEventComponent } from './User/view-event/view-event.component';
import { ViewActivityComponent } from './User/view-activity/view-activity.component';
import { DatePipe } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CustomPipePipe } from './custom-pipe.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersidebarComponent } from './User/usersidebar/usersidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    AddEventComponent,
    AddActivityComponent,
    AddPriceComponent,
    EventPublishComponent,
    ViewEventComponent,
    ViewActivityComponent,
    NavbarComponent,
    SidebarComponent,
    CustomPipePipe,
    UsersidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
