import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api-service/api.service';
import {User} from '../../user';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-user-form-edit',
  templateUrl: './user-form-edit.component.html',
  styleUrls: ['./user-form-edit.component.css']
})
export class UserFormEditComponent implements OnInit {

  userId: string;
  user: User;

  constructor(private route: ActivatedRoute, private service: ApiService, private toastr: ToastrService, private router: Router) {
  }

  ngOnInit() {
    this.user = null;
    this.userId = this.route.snapshot.params.id;
    this.service.getUserById(this.userId, this);
  }

  onSubmit(form: NgForm) {
    this.service.editUser(form.value);
  }

}
