import { Injectable } from '@angular/core';
import {User} from '../../user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  readonly rootUrl = 'http://localhost:8080/api';

  formData: User;
  users: User[];

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(this.rootUrl + '/users/' + id);
  }

  getUsers() {
    return this.http.get(this.rootUrl + '/users');
  }

  getUsersByName(name: string) {
    return this.http.get(this.rootUrl + '/search?Name=' + name);
  }

  addUser(user: User): Observable<{}> {
    return this.http.post(this.rootUrl + '/users', JSON.stringify(user), this.httpOptions);
  }

  editUser(user: User): Observable<{}> {
    return this.http.put(this.rootUrl + '/users', JSON.stringify(user), this.httpOptions);
  }

  deleteUser(id: number): Observable<{}> {
    return this.http.delete(this.rootUrl + '/user/' + id);
  }
}
