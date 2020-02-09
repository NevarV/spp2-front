import {Component, OnInit} from '@angular/core';
import {ViewService} from '../view/view.service';
import {NgForm} from '@angular/forms';
import {ApiService} from '../api-service/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  name: string;

  constructor(private viewService: ViewService, private apiService: ApiService) {
  }

  ngOnInit() {
    this.name = '';
  }

  showForm() {
    this.viewService.resetForm = true;
    this.viewService.formVisible = true;
  }

  showList() {
    this.viewService.formVisible = false;
  }

  onSubmit(form: NgForm) {
    if (this.name) {
      this.apiService.getUsersByName(this.name);
    } else {
      this.apiService.getUsers();
    }
  }
}
