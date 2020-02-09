import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './user-form/user-form.component';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserFormComponent,
    NavbarComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot()
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
