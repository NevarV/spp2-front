import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import * as Stomp from 'stompjs';
import {ApiService} from '../../content/api-service/api.service';
import {TokenStorageService} from '../token-storage/token-storage.service';
import {Router} from '@angular/router';

const AUTH_API = 'http://localhost:8080/auth/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ws: any;
  connected = false;

  constructor(private apiService: ApiService, private tokenStorage: TokenStorageService, private router: Router) {
    this.connect();
  }

  connect() {
    if (!this.connected) {
      const socket = new WebSocket('ws://nevar-vlad-spp-2.herokuapp.com/spp-back-project');
      this.ws = Stomp.over(socket);
      const that = this;
      // tslint:disable-next-line:only-arrow-functions
      this.ws.connect({}, function(frame) {
        // tslint:disable-next-line:only-arrow-functions
        that.ws.subscribe('/user/queue/auth/reply', function(message) {
          that.connected = true;
          console.log(message);
          const data = JSON.parse(message.body);
          that.tokenStorage.saveToken(data.accessToken);
          that.tokenStorage.saveUser(data);
          that.disconnect();
          that.apiService.connect();
          that.router.navigate(['/home']);
        });
        // tslint:disable-next-line:only-arrow-functions
      }, function(error) {
        alert('STOMP error ' + error);
        that.connected = false;
      });
    }
  }

  disconnect() {
    if (this.ws !== null) {
      this.ws.disconnect();
    }
    this.connected = false;
    console.log('Disconnected');
  }

  login(credentials) {
    const data = JSON.stringify(credentials);
    this.ws.send('/auth/signin', {}, data);
  }

  register(client) {
    const data = JSON.stringify(client);
    this.ws.send('/auth/signup', {}, data);
  }
}
