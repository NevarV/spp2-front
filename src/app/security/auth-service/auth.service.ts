import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private apollo: Apollo) {
  }

  login(credentials): Observable<any> {
    return this.apollo
      .query<any>({
        query: gql`
        query($loginRequest: LoginRequest) {
          authenticateUser(loginRequest: $loginRequest) {
            token
            type
            id
            username
            roles
          }
        }
        `
        , variables: {
          loginRequest: {
            username: credentials.username,
            password: credentials.password
          }
        }
      });
  }

  register(client): Observable<any> {
    return this.apollo
      .mutate<any>({
        mutation: gql`
        mutation RegisterUser($signUpRequest: SignUpRequest) {
          registerUser(signUpRequest: $signUpRequest) {
            message
            successfully
          }
        }
        `
        , variables: {
          signUpRequest: {
            username: client.username,
            password: client.password,
            role: null
          }
        }
      });
  }
}
