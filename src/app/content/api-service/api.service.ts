import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../../user';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly rootUrl = environment.apiUrl;

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
    this.http.get(this.rootUrl + '/users')
      .toPromise().then(res => this.users = res as User[]);
  }

  getUsersByName(name: string) {
    this.http.get(this.rootUrl + '/search?Name=' + name)
      .toPromise().then(res => this.users = res as User[]);
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
