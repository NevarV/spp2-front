import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './content/users/users.component';
import {LoginComponent} from './security/login/login.component';
import {RegisterComponent} from './security/register/register.component';
import {UserFormComponent} from './content/user-form/user-form.component';
import {AuthGuard} from './security/router-guard/auth.guard';
import {NotFoundComponent} from './errors/not-found/not-found.component';
import {HomeLayoutComponent} from './layouts/home-layout/home-layout.component';
import {LoginLayoutComponent} from './layouts/login-layout/login-layout.component';
import {UserFormEditComponent} from './content/user-form-edit/user-form-edit.component';


const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: UsersComponent},
      {path: 'form', component: UserFormComponent},
      {path: 'users/:id/edit', component: UserFormEditComponent}
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'NotFound', component: NotFoundComponent},
      {path: '**', redirectTo: 'NotFound'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
