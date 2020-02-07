import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {User} from '../user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly rootUrl = 'http://localhost:8080';

  formData: User;
  users: User[];

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getUsers() {
    this.http.get(this.rootUrl + '/users')
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
