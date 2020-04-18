import {Component, OnInit} from '@angular/core';
import {ViewService} from '../view/view.service';
import {NgForm} from '@angular/forms';
import {ApiService} from '../api-service/api.service';
import {TokenStorageService} from '../../security/token-storage/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  name: string;
  username: string;

  constructor(private viewService: ViewService, private apiService: ApiService, private tokenStorageService: TokenStorageService, private router: Router) {
  }

  ngOnInit() {
    this.name = '';
    this.username = this.tokenStorageService.getUser().username;
  }

  onSubmit(form: NgForm) {
    if (this.name) {
      this.apiService.getUsersByName(this.name);
    } else {
      this.apiService.getUsers();
    }
  }
}
