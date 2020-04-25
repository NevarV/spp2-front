import {Injectable} from '@angular/core';
import {User} from '../../user';
import {HttpService} from '../http-service/http.service';
import * as Stomp from 'stompjs';
import {UserFormEditComponent} from '../user-form-edit/user-form-edit.component';
import {TokenStorageService} from '../../security/token-storage/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  formData: User;
  specifiedData = false;
  users: User[] = [];
  ws: any;
  waiter: UserFormEditComponent;
  connected = false;

  constructor(private httpService: HttpService, private tokenStorageService: TokenStorageService) {
    this.connect();
  }

  connect() {
    const accessToken = this.tokenStorageService.getToken();
    if (!this.connected && accessToken) {
      const socket = new WebSocket('wss://nevar-vlad-spp-2.herokuapp.com/spp-back-project');
      this.ws = Stomp.over(socket);
      const that = this;
      // tslint:disable-next-line:only-arrow-functions
      this.ws.connect({'X-Authorization': 'Bearer ' + accessToken}, function(frame) {
        that.connected = true;
        // tslint:disable-next-line:only-arrow-functions
        that.ws.subscribe('/user/queue/errors', function(message) {
          alert('Error ' + message.body);
        });
        // tslint:disable-next-line:only-arrow-functions
        that.ws.subscribe('/user/queue/users', function(message) {
          console.log(message);
          that.users = JSON.parse(message.body);
        });
        // tslint:disable-next-line:only-arrow-functions
        that.ws.subscribe('/topic/users', function(message) {
          console.log(message);
          if (!that.specifiedData) {
            that.users = JSON.parse(message.body);
          }
        });
        // tslint:disable-next-line:only-arrow-functions
        that.ws.subscribe('/user/queue/users/edit', function(message) {
          console.log(message);
          if (that.waiter != null) {
            that.waiter.user = JSON.parse(message.body);
            that.waiter = null;
          }
        });
        // tslint:disable-next-line:only-arrow-functions
      }, function(error) {
        that.connected = false;
        alert('STOMP error ' + error);
      });
    }
  }

  getWs() {
    if (this.connected) {
      return this.ws;
    } else {
      this.connect();
      return this.ws;
    }
  }

  getUserById(id: string, waiter: UserFormEditComponent) {
    this.getWs().send('/users/' + id);
    this.waiter = waiter;
  }

  getUsers() {
    this.specifiedData = false;
    this.getWs().send('/users');
  }

  getUsersByName(name: string) {
    this.specifiedData = true;
    this.getWs().send('/users/filter', {}, name);
  }

  addUser(user: User) {
    const data = JSON.stringify(user);
    this.getWs().send('/users/new', {}, data);
  }

  editUser(user: User) {
    const data = JSON.stringify(user);
    this.getWs().send('/users/edit', {}, data);
  }

  deleteUser(id: number) {
    this.getWs().send('/users/' + id + '/delete');
  }

}
