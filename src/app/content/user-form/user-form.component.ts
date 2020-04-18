import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api-service/api.service';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ViewService} from '../view/view.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  constructor(private service: ApiService, private toastr: ToastrService, private viewService: ViewService) {
  }

  ngOnInit() {
    this.service.formData = {
      id: null,
      name: '',
      age: null
    };
  }

  onSubmit(form: NgForm) {
    this.service.addUser(form.value).subscribe(res => {
      this.toastr.success('Inserted successfully', 'Adminka');
      this.viewService.showUsers();
    });
  }
}
