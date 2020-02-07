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
    if (this.viewService.resetForm) {
      this.resetForm();
    }
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      id: null,
      name: '',
      age: null
    };
  }

  onSubmit(form: NgForm) {
    if (form.value.id == null) {
      this.insertRecord(form);
    } else {
      this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.service.addUser(form.value).subscribe(res => {
      this.toastr.success('Inserted successfully', 'Adminka');
      this.resetForm(form);
    });
  }

  updateRecord(form: NgForm) {
    this.service.editUser(form.value).subscribe(res => {
      this.toastr.success('Updated successfully', 'Adminka');
      this.resetForm(form);
    });
  }
}
