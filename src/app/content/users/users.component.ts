import {Component, OnInit} from '@angular/core';

import {ApiService} from '../api-service/api.service';
import {User} from '../../user';
import {ViewService} from '../view/view.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private service: ApiService, private toastr: ToastrService, private viewService: ViewService) {
  }

  ngOnInit() {
    this.viewService.tinyComponent = false;
    this.refreshList();
  }

  refreshList() {
    this.service.getUsers();
  }

  populateForm(user: User) {
    this.service.formData = Object.assign({}, user);
    this.viewService.showForm();
  }

  deleteRecord(id: number) {
    this.service.deleteUser(id).subscribe(res => {
      this.toastr.success('Deleted successfully', 'Adminka');
      this.refreshList();
    });
  }

}
