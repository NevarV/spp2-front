import {Injectable} from '@angular/core';

import {HttpClient, HttpResponse} from '@angular/common/http';
import {User} from '../user';
import {Observable} from 'rxjs';

const localUrl = 'http://localhost:8080/users';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<HttpResponse<User[]>> {
    return this.http.get<User[]>(
      localUrl, {observe: 'response'});
  }
}
