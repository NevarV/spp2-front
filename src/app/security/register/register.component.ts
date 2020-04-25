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
    this.authService.register(this.form).subscribe(
      ({data}) => {
        data = data.registerUser;
        console.log(data);
        if (data.successfully) {
          this.isSignUpFailed = false;
          this.toastr.success('Account was created successfully', 'Adminka');
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = data.message;
          this.isSignUpFailed = true;
        }
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
