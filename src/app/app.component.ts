import { Component } from '@angular/core';

import { ApiService } from './api-service/api.service';
import {User} from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users: User[] = [];
  constructor(private api: ApiService) {
    this.getSmartphones();
  }
  title = 'front-project';
  getSmartphones() {
    this.api.getUsers()
      .subscribe(resp => {
        console.log(resp);
        const keys = resp.headers.keys();
        for (const data of resp.body) {
          this.users.push(data);
        }
        console.log(this.users);
      });
  }
}
