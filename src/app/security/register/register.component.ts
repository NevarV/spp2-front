import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth-service/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.register(this.form);
    this.router.navigate(['/login']);
  }
}
