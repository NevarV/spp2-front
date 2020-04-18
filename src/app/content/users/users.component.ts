import {Component, OnInit} from '@angular/core';

import {ApiService} from '../api-service/api.service';
import {User} from '../../user';
import {ViewService} from '../view/view.service';
import {ToastrService} from 'ngx-toastr';
import {TokenStorageService} from '../../security/token-storage/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private service: ApiService, private toastr: ToastrService, private viewService: ViewService, private tokenStorageService: TokenStorageService, private router: Router) {
  }

  ngOnInit() {
    this.viewService.tinyComponent = !this.tokenStorageService.canWrite();
    this.refreshList();
  }

  refreshList() {
    this.service.getUsers();
  }

  populateForm(user: User) {
    this.router.navigate(['/users/' + user.id + '/edit']);
  }

  deleteRecord(id: number) {
    this.service.deleteUser(id).subscribe(res => {
      this.toastr.success('Deleted successfully', 'Adminka');
      this.refreshList();
    });
  }

}
