import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth-service/auth.service';
import {TokenStorageService} from '../token-storage/token-storage.service';
import {ViewService} from '../../content/view/view.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private viewService: ViewService,
              private router: Router) {
  }

  ngOnInit() {
    this.tokenStorage.signOut();
    this.viewService.tinyComponent = true;
    this.authService.connect();
  }

  onSubmit() {
    this.authService.login(this.form);
  }

}
