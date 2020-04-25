import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {User} from '../../user';
import {Observable} from 'rxjs';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  formData: User;
  users: User[] = [];

  constructor(private http: HttpClient, private apollo: Apollo) {
  }

  getUserById(id: string): Observable<any> {
    return this.apollo
      .query<any>({
        query: gql`
        query($id: Int) {
          getUserById(id: $id) {
            id
            name
            age
          }
        }
        `
        , variables: {
          id
        }
      });
  }

  getUsers() {
    this.apollo
      .query<any>({
        query: gql`
        {
          getUsers {
             id
             name
             age
          }
        }
        `
      }).toPromise().then(({data}) => {
      this.users = data.getUsers;
    });
  }

  getUsersByName(name: string) {
    this.apollo
      .query<any>({
        query: gql`
        query($name: String) {
          getUsersByName(name: $name) {
             id
             name
             age
          }
        }
        `
        , variables: {
          name
        }
      }).toPromise().then(({data}) => {
      this.users = data.getUsersByName;
    });
  }

  addUser(user: User): Observable<{}> {
    return this.apollo.mutate({
      mutation: gql`
      mutation CreateUser($user: InputUser) {
        addUser(user: $user)
      }
      `
      ,
      variables: {
        user
      }
    });
  }

  editUser(user: User): Observable<{}> {
    return this.apollo.mutate({
      mutation: gql`
      mutation EditUser($user: InputUser) {
        editUser(user: $user)
      }
      `
      ,
      variables: {
        user
      }
    });
  }

  deleteUser(id: number): Observable<{}> {
    return this.apollo.mutate({
      mutation: gql`
      mutation CreateUser($id: Int) {
        deleteUser(id: $id)
      }
      `
      ,
      variables: {
        id
      }
    });
  }
}
