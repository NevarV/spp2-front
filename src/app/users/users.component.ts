import {Component, OnInit} from '@angular/core';

import {ApiService} from '../api-service/api.service';
import {User} from '../user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private api: ApiService) {
    this.getUsers();
  }

  getUsers() {
    this.api.getUsers()
      .subscribe(resp => {
        for (const data of resp.body) {
          console.log(data);
          this.users.push(data);
        }
      });
  }

  ngOnInit() {
  }

}
