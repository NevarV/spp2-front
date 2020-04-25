import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UsersComponent} from './content/users/users.component';
import {UserFormComponent} from './content/user-form/user-form.component';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {NavbarComponent} from './content/navbar/navbar.component';
import {RegisterComponent} from './security/register/register.component';
import {LoginComponent} from './security/login/login.component';
import {AuthInterceptor} from './security/request-filters/auth.interceptor';
import {AuthGuard} from './security/router-guard/auth.guard';
import {NotFoundComponent} from './errors/not-found/not-found.component';
import {HomeLayoutComponent} from './layouts/home-layout/home-layout.component';
import {LoginLayoutComponent} from './layouts/login-layout/login-layout.component';
import { UserFormEditComponent } from './content/user-form-edit/user-form-edit.component';
import { GraphQLModule } from './graphql.module';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserFormComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    NotFoundComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    UserFormEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    GraphQLModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
